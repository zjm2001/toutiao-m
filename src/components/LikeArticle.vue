<template>
 <van-icon color="#ffa500" name="good-job"  v-if="value === 1" @click="onLike"/>
<van-icon color="#777" name="good-job-o"  v-else @click="onLike"/>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  props: {
    // 父组件使用v-model绑定数据直接这样接收
    value: {
      type: [Number, Object, String],
      requireD: true

    },
    id: {
      requireD: true
    }
  },
  methods: {
    async onLike () {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已经点赞，则取消点赞
        if (this.value === 1) {
          await deleteLike(this.id)
          this.$emit('input', -1)
          //   this.value = -1
          this.$toast.success('取消点赞')
        } else {
          // 否则添加点赞
          await addLike(this.id)
          //   this.value = 1
          this.$emit('input', 1)
          this.$toast.success('点赞成功')
        }
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
