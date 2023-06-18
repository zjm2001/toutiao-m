<template>
    <div class="search-sugges">
        <van-cell v-for="(item, index) in suggesList" :key="index" icon="search" @click="$emit('search' ,item)">
            <template #title>
                <div v-html="highlight(item)"></div>
            </template>
        </van-cell>
    </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
import { debounce } from '@/utils/debounce.js'
export default {
  name: 'SearrchSUgges',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggesList: null

    }
  },
  watch: {
    searchText: {
      /** 当searchText发生改变时调用 */
      immediate: true, // 立即执行网页打开就执行一次
      //   handler (newval) {
      //     this.loadSearchSugges(newval)
      //   }
      handler: debounce(function (newval) {
        this.loadSearchSugges(newval)
      }, 800)
    }
  },
  methods: {
    /** 获取联想建议 */
    async loadSearchSugges (q) {
      try {
        const { data } = await getSuggestion(q)
        // console.log(data)
        this.suggesList = data.data.options
      } catch (error) {
        this.$toast.fail('获取失败,稍后重试')
      }
    },
    highlight (item) {
      if (item === null) return
      const highlightStr = `<span style="color:red">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, highlightStr)
    }
  }

}
</script>

<style lang="less" scoped>

</style>
