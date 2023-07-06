<template>
    <div>
        <van-nav-bar left-arrow title="历史记录" @click-left="$emit('close')" fixed />
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="err"
            error-text="加载失败" class="mylist">
            <ArticleTiem v-for="(item, index) in list" :key="index" :article="item"></ArticleTiem>
        </van-list>
    </div>
</template>

<script>
import { getHistories } from '@/api/user.js'
import ArticleTiem from '@/components/ArticleTiem.vue'
export default {
  components: {
    ArticleTiem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      err: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getHistories({
          page: this.page,
          per_page: 10

        })
        console.log(data)
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
      }
    }
  }

}
</script>

<style lang="less" scoped>
.mylist {
    margin-top: 46px;
}
</style>
