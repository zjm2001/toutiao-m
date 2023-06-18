<template>
    <div class="search-history">
        <van-cell title="搜索历史" value="内容">
            <div v-if="isDeleteShow">
                <span @click="$emit('upadata-history')">全部删除</span>
                &nbsp; &nbsp; &nbsp;
                <span @click="isDeleteShow=false">完成</span>
            </div>
            <van-icon name="delete" v-else @click="isDeleteShow=true"></van-icon>
        </van-cell>
        <van-cell :title="item" v-for="(item, ind) in serachHistories" :key="ind" @click="onSearchitem(item,ind)">
            <van-icon name="close" v-show="isDeleteShow"></van-icon>
        </van-cell>

    </div>
</template>

<script>
export default {
  name: 'search-history',
  props: {
    serachHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制
    }
  },
  methods: {
    /** 这是搜索历史的点击事件 */
    onSearchitem (item, ind) {
      if (this.isDeleteShow) {
        // 删除状态
        this.serachHistories.splice(ind, 1)
      } else {
        // 非删除状态进入搜索
        this.$emit('search', item)
      }
    }
  }

}
</script>

<style></style>
