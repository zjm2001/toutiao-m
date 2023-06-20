<template>
  <!-- true展示实心否则展示为展示空 -->
  <van-icon color="#ffa500" name="star"  v-if="value" @click="onCollect"/>
  <van-icon color="#777" name="star-o" v-else  @click="onCollect" />

</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  props: {
    // 父组件使用v-model绑定数据直接这样接收
    value: {
      type: Boolean,
      requireD: true

    },
    id: {
      requireD: true
    }
  },
  methods: {
    async onCollect () {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已收藏，则取消收藏
        if (this.value) {
          await deleteCollect(this.id)
          this.$toast.success('取消收藏')
        } else {
          // 添加收藏
          await addCollect(this.id)
          this.$toast.success('收藏成功')
        }
        this.$emit('input', !this.value)
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    }
  }

}
</script>

<style>

</style>
