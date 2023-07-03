<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <div class="top-wrap">
      <van-nav-bar :title="`${list.reply_count===0? '暂无':`${list.reply_count}条`}回复`" >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>
    </div>

    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <CommentItem :obj="list"></CommentItem>
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <CommentList :source="list.com_id" :types="'c'"    :list="commentList" ></CommentList>

    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <div class="post-wrap">
     <van-button size="mini" round class="post-btn" @click="isPostshow=true">写评论</van-button>
    </div>
    <!-- /底部 -->
    <van-popup v-model="isPostshow" position="bottom">
      <CommentPost  :target="list.com_id" @post-success="onPostSuccess" ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
// import eventBus from '@/eventBus/index.js'
import CommentItem from './CommentItem.vue'
import CommentList from './CommentList.vue'
import CommentPost from './CommentPost.vue'
export default {
  props: {
    list: {
      type: [Object],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data () {
    return {
      isPostshow: false,
      commentList: []
    }
  },
  created () {
  },
  methods: {
    onPostSuccess (data) {
      // 更新回复的数量
      this.list.reply_count++
      // 关闭弹层
      this.isPostshow = false
      // 将最新回复的内容展示到列表的顶部
      this.commentList.unshift(data.new_obj)
    }
  }

}
</script>

<style lang="less" scoped>
.top-wrap{
  z-index: 3;
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  overflow-y: auto;
  margin-bottom: 44px;
}
.post-wrap{
  position:fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid  #d8d8d8d8 ;
  .post-btn{
    width: 60%;
  }

}
</style>
