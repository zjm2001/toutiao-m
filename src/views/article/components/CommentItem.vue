<template>
    <div class="item">
     <van-cell >
        <van-image slot="icon" round width="30" height="30" style="margin-right: 10px;" :src="obj.aut_photo" />
        <span style="color: #466b9d;" slot="title">{{ obj.aut_name }}</span>
        <div slot="label">
            <p style="color: #363636;">{{ obj.content }}</p>
            <p>
                <span style="margin-right: 10px;">{{ obj.pubdate | rev }}</span>
                <van-button size="mini" type="default"  @click="onReply(obj)">回复{{ obj.reply_count===0 ? ' ': obj.reply_count }}</van-button>
            </p>
        </div>
        <template #right-icon>
           <van-button class="btn" @click="onLike(obj)" :loading='commentLoading'>
            <van-icon :name="obj.is_liking ? 'like' :'like-o'" :color="obj.is_liking ? 'red' :'#ccc'"  >  {{ obj.like_count===0? ' ': obj.like_count}}</van-icon>
           </van-button>

        </template>
    </van-cell>
    </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment.js'
import eventBus from '@/eventBus/index.js' // 引入
export default {
  props: {
    obj: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      commentLoading: false

    }
  },
  methods: {
    /** 点击喜欢评论按钮 */
    async onLike (obj) {
      this.commentLoading = true
      try {
        if (obj.is_liking) {
          // 已经点赞
          await deleteCommentLike(obj.com_id)
          obj.like_count--
        } else {
          // 没有点赞
          await addCommentLike(obj.com_id)
          obj.like_count++
        }
      } catch (error) {
        this.$toast.fail('获取错误')
      }
      obj.is_liking = !obj.is_liking
      // console.log(obj.com_id)
      // console.log(obj.like_count)
      this.commentLoading = false
    },
    /** 点击回复按钮弹出 */
    onReply (obj) {
      eventBus.$emit('onReply', obj, true)
    }
  }

}
</script>

<style lang="less" scoped>
.item{
    .btn{
        border: none;
    }
}
</style>
