<template>
  <div class="my">
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image round class="imgs" :src="userInfo.photo" fit="cover" />
          <span class="textname">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button round type="default" size="mini" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="base-status">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="">
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 收藏和历史 -->
    <van-grid :column-num="2" clickable class="grid-nav">
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="iconfont icon-lishi"></i>
        </template>
        <!-- <template #text>
          <span class="text">历史</span>
        </template> -->
        <!-- 两种不同写法 -->
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知,小智同学 退出登录 -->
    <van-cell title="消息通知" is-link  class="cell"/>
    <van-cell title="小智同学" is-link  class="cell"/>
    <van-cell title="退出登录" clickable  class="layout"  v-if="user" @click="layout"/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'my',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.user) {
      this.loadeUserInfo()
    }
  },
  methods: {
    // 退出登录
    layout () {
      // 设置退出提示
      this.$dialog.confirm({
        title: '确定退出吗'
      })
        .then(() => {
          // 确认退出删除user(vuex和本地都删除)
          // console.log('确认执行')
          this.$store.commit('setUser', null) // 这里面已经吧本地的进行删除了
        })
        .catch(() => {
          // console.log('取消执行')
        })
    },
    // 获取自己信息
    async loadeUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.my {
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 210px;
    // css中使用路径加~
    background: url(~@/assets/banner.png);
    background-size: cover;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
      }

      .text {
        margin-top: 8px;
        font-size: 16px;
        color: #fff;
      }
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    .base-info {
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 130px;
      padding: 35px 18px 14px;
      // background-color: aqua;

      .left {
        display: flex;
        align-items: center;

        .imgs {
          margin-right: 10px;
          width: 70px;
          height: 70px;
          border: 3px solid #fff;
        }

        .textname {
          font-size: 20px;
          color: #fff;
        }
      }
    }

    .base-status {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 210-130px;

      // background-color: pink;
      .data-item {
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;

        //  background-color: #fff;
        .count {
          font-size: 16px;
          margin-bottom: 5px;
          text-align: center;
        }

        .text {
          font-size: 14px;
          text-align: center;
        }

      }
    }
  }

  .grid-nav {
    .grid-item{
      height: 70px;
      .iconfont{
        font-size: 25px;
      margin-bottom: 5px;
      }
      .icon-shoucang {
      color: #f86152;
    }
    .icon-lishi {
      color: #ffa01a;
    }
    .text{
      color: #636366;
    }

    }

  }
  .cell{
    height: 50px;
    font-size: 16px;
    color: #636366;
  }
  .layout{
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    color: #cb918f;
  }
}
</style>
