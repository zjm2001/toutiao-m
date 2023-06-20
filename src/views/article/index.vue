<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" class="iconff" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | rev }}</div>
          <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" :loading="followLoading"
            v-if="!article.is_followed" @click="onFollowed">关注</van-button>
          <van-button v-else class="follow-btn" round size="small" @click="onFollowed" :loading="followLoading">已关注</van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content  markdown-body" ref="article" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
          <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
      <van-icon name="comment-o" info="123" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <CollectArticle v-model="article.is_collected" :id="article.art_id" ></CollectArticle>
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <LikeArticle v-model="article.attitude " :id="article.art_id"></LikeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CollectArticle from '@/components/CollectArticle.vue'
import LikeArticle from '@/components/LikeArticle.vue'

export default {
  name: 'ArticleIndex',
  components: {
    CollectArticle,
    LikeArticle
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // loading状态
      status: 0, // 状态码
      followLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () { },
  methods: {
    /** 根据id加载文章信息 */
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // console.log(data)
        this.article = data.data
        this.loading = false
        // 这里面放置获取图片nextTick才能拿到数据
        this.$nextTick(() => {
          this.previewImge()
        })
      } catch (error) {
        this.loading = false
        if (error.response && error.response.status === 404) {
          this.status = 404
        }
        this.$toast.fail('获取数据失败')
      }
    },
    /** 图片加载问题 */
    previewImge () {
      const allContent = this.$refs.article
      const imgs = allContent.querySelectorAll('img')
      const images = []
      // console.log(imgs)
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
      // console.log(images)
    },
    /** 关注按钮的点击事件 可以进行封装使用 */
    async onFollowed () {
      this.followLoading = true // loading状态
      try {
        if (this.article.is_followed) {
          // 已关注
          await deleteFollow(this.article.aut_id)
          this.article.is_followed = false
        } else {
          // 未关注
          await addFollow(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast('你不能关注自己')
        } else {
          this.$toast(error.message)
        }
      }
      this.followLoading = false
    }
  }

}
</script>

<style scoped lang="less">
.article-container {
  .iconff {
    color: #fff;
    font-size: 16px;
  }

  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;

      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 16px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }

    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }

    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 141px;
      height: 23px;
      border: 2px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }

    .van-icon {
      font-size: 20px;

      .van-info {
        font-size: 9px;
        background-color: #e22829;
      }
    }
  }

}
</style>
