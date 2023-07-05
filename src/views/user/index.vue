<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息">
      <template #left>
        <van-icon name="arrow-left" class="iconff" @click="$router.back()" />
      </template>

    </van-nav-bar>
    <!-- /导航栏 -->
    <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
    >

    <!-- 个人信息 -->
    <van-cell class="avatar-cell" title="头像" is-link center  @click="$refs.file.click()">
      <van-image class="avatar" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdataNameShow = true" />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdataGenderShow = true" />
    <van-cell title="生日" :value="user.birthday" is-link  @click="isUpdateBirthdayShow = true"  />
    <!-- /个人信息 -->
    <!-- 编辑昵称的弹出层 -->
    <van-popup v-model="isUpdataNameShow" style="height:100%" position="bottom">
      <UpdateName @close="isUpdataNameShow = false" v-model="user.name" v-if="isUpdataNameShow"></UpdateName>
    </van-popup>
    <!-- 编辑昵称的弹出层 -->
    <!-- 编辑性别弹出层 -->
    <van-popup v-model="isUpdataGenderShow" position="bottom">

      <UpdateGender v-if="isUpdataGenderShow" v-model="user.gender" @close="isUpdataGenderShow = false"></UpdateGender>
    </van-popup>
    <!-- 编辑性别弹出层 -->
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday v-if="isUpdateBirthdayShow" v-model="user.birthday" @close="isUpdateBirthdayShow = false" />
    </van-popup>
    <!-- /编辑生日 -->
        <!-- 编辑头像 -->
        <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%;"
    >
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from './components/UpdtaeName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import UpdatePhoto from './components/UpdatePhoto.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      user: {},
      isUpdataNameShow: false,
      isUpdataGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () { },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (error) {
        this.$totast('获取数据失败')
      }
    },
    /** 获取文件对象 */
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]

      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)

      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .van-nav-bar__left {
    .van-icon {
      color: #fff
    }
  }

  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }

    .avatar {
      width: 60px;
      height: 60px;
    }
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
