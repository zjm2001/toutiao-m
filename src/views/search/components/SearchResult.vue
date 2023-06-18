<template>
    <div class="=search-result">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="err" error-text="加载失败">
            <van-cell v-for="item in list" :key="item.artid" :title="item.title" />
        </van-list>
    </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [], // 数据列表
      loading: false, // 加载状态
      finished: false, // 是否展示底部加载完成
      page: 1, // 页码
      err: false // 是否展示错误信息
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: 20,
          q: this.searchText
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.err = true
        this.$toast.fail('获取失败,稍后重试')
      }
    }
  }
}
</script>

<style></style>
