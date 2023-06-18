<template>
  <div class="search">
    <!-- 顶部搜索栏 -->
    <form action="/" class="search-form">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
        background="#2892ff" @focus="isResultShow = false" />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- 搜索联想 -->
    <SearchSugges v-else-if="searchText" :searchText="searchText" @search="onSearch"></SearchSugges>
    <!-- 历史记录 -->
    <SearchHistory v-else :serachHistories="serachHistories" @upadata-history="serachHistories=[]" @search="onSearch"></SearchHistory>

  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSugges from './components/SearchSugges.vue'
import SearchResult from './components/SearchResult.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'search',
  data () {
    return {
      searchText: '', // 输入框数据
      isResultShow: false, // 控制搜索结果展示
      serachHistories: getItem('list') || [] // 搜索历史记录
    }
  },
  components: {
    SearchHistory,
    SearchSugges,
    SearchResult
  },
  methods: {
    /** 回车和点击联想后触发 */
    onSearch (val) {
      console.log(val)
      this.searchText = val
      // 存储历史记录(不重复,最新排最前面)
      const index = this.serachHistories.indexOf(val)
      if (index !== -1) {
        this.serachHistories.splice(index, 1)
      }
      this.serachHistories.unshift(val)
      this.isResultShow = true
    },
    /** 点击取消按钮的点击事件 */
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    /** 侦听历史数组变化保存本地 */
    serachHistories (val) {
      setItem('list', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 54px;
  .van-search__action {
    color: #fff
  }
  .search-form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
