<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false"
      :error="err" error-text="加载失败点击重试">
      <CommentItem v-for="(obj, ind) in list" :key="ind" :obj="obj"></CommentItem>
    </van-list>
    <!-- 评论列表 -->

  </div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './CommentItem.vue'

export default {
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    types: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'

    },
    list: {
      type: [Array, Object],
      default: () => []
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页数据标记
      err: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      // 请求获取数据
      try {
        const { data } = await getComments({
          type: this.types, // 评论类型a是对文章评论c-对评论回复
          source: this.source.toString(), // 源id  文章id或评论id
          offset: this.offset,
          limit: 10
        })
        const { results, total_count: count } = data.data
        this.list.push(...results)
        // console.log(this.list)
        // 想父组件发送总条数的自定义事件
        this.$emit('updata-totalCount', count)
        this.loading = false
        // 获取下一页数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.err = true
        this.loading = false
      }
    }
  }
  // watch: {
  //   source () {
  //     console.log(111)
  //     // this.list = []
  //     this.onLoad()
  //   }
  // }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
