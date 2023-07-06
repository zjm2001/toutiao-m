<template>
    <div>
        <van-nav-bar left-arrow title="我的收藏" @click-left="$emit('close')"  fixed/>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="err" error-text="加载失败" class="mylist">
            <MyItem v-for="(item, index) in list" :key="index" :article="item"></MyItem>
        </van-list>
    </div>
</template>

<script>
import { getCollections } from '@/api/user.js'
import MyItem from './MyItem.vue'
export default {
  components: {
    MyItem
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
    async  onLoad () {
      try {
        const { data } = await getCollections({
          page: this.page,
          per_page: 10

        })
        // console.log(data)
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
.mylist{
    margin-top: 46px;
}</style>
