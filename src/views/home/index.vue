<template>
  <div class="home">
    <!-- 头部搜索区域 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button round type="info" class="btn">
          <template #default>
            <i class="iconfont icon-sousuo"></i>
            <span> 搜索</span>
          </template>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tab标签栏 -->
    <van-tabs class="tabs" v-model="active" animated swipeable>
      <van-tab :title="obj.name" v-for="obj in userChannels" :key="obj.id">
        <!-- 文章列表 -->
        <ArticleList :channels="obj"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="null"> </div>
      <template #nav-right>
        <div class="ham-btn">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'
export default {
  name: 'home',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0, // tab栏的index
      userChannels: []
    }
  },
  created () {
    this.loadeUserChannels()
  },
  methods: {
    async loadeUserChannels () {
      try {
        const { data } = await getUserChannels()
        this.userChannels = data.data.channels
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
    }
  }

}
</script>

<style scoped lang="less">
.home {
  padding-bottom: 50px;
  padding-top: 87px;

  .page-nav-bar {
    .btn {
      width: 210px;
      height: 33px;
      background-color: #54a6ff;
    }
  }

  /deep/ .tabs {
    .van-tab__wrap {
      height: 41px;

    }
    .van-tabs__wrap--scrollable{
      position: fixed;
      top: 46px;
      z-index: 1;
      left: 0;
      right: 0;

    }

    .van-tab {
      min-width: 100px;
      font-size: 15px;
      border-right: 1px solid #edeff3;
    }

    .van-tab--active {
      color: #333
    }

    .van-tabs__nav {
      padding-bottom: 10;

      .van-tabs__line {
        width: 24px;
        height: 2px;
        background-color: #3296fa;
        bottom: 20px;
      }

      .ham-btn {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 41px;
        right: 0;
        background-color: #fff;
        opacity: .802;

        .iconfont {
          font-size: 16px;
        }

        &:before {
          content: '';
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background-image: url(../../assets/gradient-gray-line.png);
          background-size: contain;
        }
      }

      .null {
        width: 30px;
        height: 41px;
      }
    }

  }
}
</style>
