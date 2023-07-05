<template>
    <div>
        <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onUpDataConfirm" />
       <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  props: {
    value: {
      type: String,
      required: true

    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onUpDataConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0

      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({ name: localName })
        // 使用的是v-m修改的组件
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast('获取错误')
      }
    }

  }

}
</script>

<style lang="less" scoped>
.field-wrap {
  padding: 10px;
}
</style>
