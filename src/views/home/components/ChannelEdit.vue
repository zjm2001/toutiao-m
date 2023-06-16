<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <template #title>
        <span class="title-text">我的频道</span>
      </template>
      <van-button class="btn" type="danger" plain round size="small" @click="isEdit = !isEdit">{{ isEdit
        ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my">
      <van-grid-item class="grid-item" v-for="(obj, index) in mylist" :key="index" @click="myListClick(obj, index)">
        <template #icon>
          <van-icon name="clear" v-show="isEdit && !flexList.includes(obj.id)"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: index === active }">{{ obj.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <span class="title-text">频道推荐</span>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="tj">
      <van-grid-item v-for="(val, ind) in remoChannels" :key="ind" :text="val.name" class="grid-item" icon="plus"
        @click="onAddChannel(val)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channe.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  props: {
    mylist: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      /** 所有频道列表存储list */
      allList: [],
      isEdit: false, // 控制编辑按钮的使用
      flexList: [0] // 固定频道不允许删除
    }
  },
  created () {
    this.loadgetAllChannels()
  },
  computed: {
    ...mapState(['user']),
    /** 筛选过后的添加列表计算属性 */
    remoChannels () {
      // 方式一
      // const channels = []
      // this.allList.forEach(item => {
      //   const ret = this.list.find(val => {
      //     return val.id === item.id
      //   })
      //   // 如果我的频道中不包含改频道选项,就不放入
      //   if (!ret) {
      //     channels.push(item)
      //   }
      // })
      // return channels // 计算结果返回
      return this.allList.filter(item => {
        return !this.mylist.find(val => {
          return val.id === item.id
        })
      })
    }
  },
  methods: {
    /**
     * 这是一个请求所有频道的函数
    */
    async loadgetAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allList = data.data.channels
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    },
    /** * 这是一个点击推荐频道添加到我的频道的点击事件 */
    async onAddChannel (val) {
      this.mylist.push(val)
      if (this.user) {
        // 登录状态
        try {
          await addUserChannels({
            id: val.id,
            seq: this.mylist.lenght
          })
        } catch (error) {
          this.$toast.fail('保存失败,稍后重试')
        }
      } else {
        // 未登录状态保存本地
        setItem('mychannel', this.mylist)
      }
    },
    /** * 这是一个点击我的频道编辑和完成不同的点击事件 */
    myListClick (obj, index) {
      if (this.isEdit) {
        if (this.flexList.includes(obj.id)) {
          return
        }
        // 编辑状态
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.mylist.splice(index, 1)
        // 处理持久化的代码
        this.deleteChannels(obj)
      } else {
        // 非编辑状态切换频道(关闭页面切换频道)
        this.$emit('update-active', index)
      }
    },
    /** * 这是一个删除频道的操作 */
    async deleteChannels (obj) {
      if (this.user) {
        // 登录(上传)
        try {
          await deleteUserChannels(obj.id)
        } catch (error) {
          this.$toast.fail('删除失败,稍后重试')
        }
      } else {
        // 未登录(本地)
        setItem('mychannel', this.mylist)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 45px 0;

  .btn {
    font-size: 13px;
    width: 60px;
    height: 20px;
  }

  .title-text {
    font-size: 16px;
    color: #333;
  }

  /deep/ .grid-item {
    width: 53px;
    height: 43px;

    .van-grid-item__content {

      white-space: nowrap;
      background-color: #f4f5f6;

      .van-grid-item__text {
        font-size: 14px;
        color: #222;
      }

      .van-grid-item__icon-wrapper {
        position: unset !important;
      }
    }
  }

  /deep/ .tj {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 12px;
          margin-right: 3px;
        }

        .van-grid-item__text {
          margin-top: 0;
        }

      }
    }
  }

  /deep/ .my {
    .grid-item {
      .text {
        font-size: 14px;
        color: #222;
      }

      .active {
        color: rgb(221, 79, 79);
      }

      .van-grid-item__content {

        .van-icon-clear {
          // display: none;
          position: absolute;
          right: -5px;
          top: -5px;
          font-size: 15px;
          z-index: 2;
          color: rgb(134, 134, 134);

        }

      }

    }

  }
}
</style>
