<template>
  <div id="app">
    <router-view />
    <h1>ash的卡和肯定会</h1>
    <i class="iconfont icon-shouye "></i>
    <van-button type="primary">vant组件的可以使用 unplugin-vue-components 插件，它可以自动引入组件，并按需引入组件的样式</van-button>
    <h1 class="text">我大好多</h1>
  </div>
</template>
<script>
export default {
  name: 'App'

}
</script>

<style lang="less" scoped>
.text{
  width: 375px;
  height: 100px;
  background-color: aqua;
}
</style>
