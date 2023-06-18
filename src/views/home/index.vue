<template>
  <div class="home">
    <!-- 头部搜索区域 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button round type="info" class="btn" @click="$router.push('/search')">
          <template #default>
            <i class="iconfont icon-sousuo"></i>
            <span> 搜索</span>
          </template>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tab标签栏 -->
    <van-tabs class="tabs" v-model="active" animated swipeable swipe-threshold="4">
      <van-tab :title="obj.name" v-for="obj in userChannels" :key="obj.id">
        <!-- 文章列表 -->
        <ArticleList :channels="obj"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="null"> </div>
      <template #nav-right>
        <div class="ham-btn" @click="show = true">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup v-model="show" closeable position="bottom" :style="{ height: '100%' }" close-icon-position="top-left">
      <!-- 组件弹出层内容1 -->
      <ChannelEdit :mylist="userChannels" :active="active" @update-active="upActive"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // tab栏的index
      userChannels: [],
      show: false // 弹出的标签编辑的钥匙
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadeUserChannels()
  },
  methods: {
    /** * 这是一个获取频道列表 */
    async loadeUserChannels () {
      try {
        // const { data } = await getUserChannels()
        // this.userChannels = data.data.channels
        // 判断是否登录展示不同数据
        let list = []
        if (this.user) {
          const { data } = await getUserChannels()
          list = data.data.channels
        } else {
          const localList = getItem('mychannel')
          if (localList) {
            list = localList
          } else {
            const { data } = await getUserChannels()
            list = data.data.channels
          }
        }
        this.userChannels = list
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
    },
    /** * 这是一个子组件传值改变active */
    upActive (index, isshow = false) {
      this.active = index
      this.show = isshow
    }
  }

}
</script>

<style  lang="less"  scoped>
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

    .van-tabs__wrap {
      position: fixed !important;
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
        min-width: 100px;
        width: 30px !important;
        height: 41px;
      }
    }

  }
}
</style>
