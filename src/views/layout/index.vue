<template>
    <div>
        <!-- layout子路由出口 -->

         <router-view ></router-view>

    <van-tabbar route  >
            <van-tabbar-item   to="/home">
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
export default {
  name: 'layout'

}
</script>

<style></style>
