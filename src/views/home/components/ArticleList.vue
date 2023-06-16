<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"  :success-text="textsuccess">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载"
        @load="onLoad">
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title" /> -->
        <ArticleTiem v-for="(item, index) in list" :key="index" :article="item"></ArticleTiem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleTiem from '@/components/ArticleTiem.vue'
export default {
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleTiem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false, // 判断是否错误
      timestamp: null, // 请求下一页的时间戳
      isLoading: false, // 控制下拉刷新状态
      textsuccess: '' // 下拉刷新成功失败提示消息
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id, // 频道id
          timestamp: this.timestamp || Date.now() // 页码(使用当前时间戳接收)
          // with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        // 这次加载结束要停止loading
        this.loading = false
        // 判断数据是否加载完成
        if (results.length) {
          // 更新下一页数据
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了
          this.finished = true
        }
      } catch (error) {
        this.error = true
        // this.$toast.fail('获取信息失败' + error.message)
      }
    },
    // 下拉刷新触发函数
    async  onRefresh () {
      // 请求获取数据停止刷新吧数据加到最前面
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id, // 频道id
          timestamp: Date.now() // 下拉刷新就是传当前时间戳
          // with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.textsuccess = `更新成功更新了${results.length}条数据`
      } catch (error) {
        this.isLoading = false
        this.textsuccess = '更新失败'
      }
    }
  }

}
</script>

<style lang="less" scoped>
.article-list{
 height: 88vh;
 overflow-y: auto;
}
</style>
