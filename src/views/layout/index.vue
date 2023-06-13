<template>
    <div>
        <!-- layout子路由出口 -->
        <keep-alive>
         <router-view ></router-view>
        </keep-alive>

    <van-tabbar v-model="active" @change="onChange" >
            <van-tabbar-item   to="/">
                <template #icon>
                    <i class="iconfont icon-shouye"></i>
                </template>
               <span>首页</span>
            </van-tabbar-item>
            <van-tabbar-item  to="/qa" >
                <template #icon>
                    <i class="iconfont icon-wenda"></i>
                </template>
               <span>问答</span>
            </van-tabbar-item>
            <van-tabbar-item  to="/videos" >
                <template #icon>
                    <i class="iconfont icon-shipin"></i>
                </template>
               <span>视频</span>
            </van-tabbar-item>

            <van-tabbar-item  to="/my">
                <template #icon>
                    <i class="iconfont icon-wode"></i>
                </template>
               <span>{{$store.state.user ? '我的' : '未登录'}}</span>
            </van-tabbar-item>

        </van-tabbar>

    </div>
</template>

<script>
import { setItem, removeItem } from '@/utils/storage.js'
export default {
  name: 'layout',
  data () {
    return {
      active: this.$store.state.active || 0
    }
  },
  methods: {
    // 监听改变事件
    onChange (index) {
      setItem('active', index)
    }
  },
  beforeCreate () {
    removeItem('active')// 初始化阶段清除存储的active放置重启问题
  }

}
</script>

<style></style>
