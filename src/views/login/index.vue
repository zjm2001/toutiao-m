<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <template #left>
        <van-icon name="arrow-left" class="iconff" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- form表单 -->
    <van-form @submit="onSubmit" ref="loginFrom">
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userRules.mobile" type="number"
        maxlength="11">
        <!-- 使用插槽配置图标 -->
        <template #left-icon>
          <i class="iconfont icon-wode"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userRules.code" type="number" maxlength="6">
        <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down :time="1000 * 10 * 6" format="ss s" v-if="isBtnShow" @finish="isBtnShow = false" />
          <van-button class="btn-bg" round size="small" v-else type="default" native-type="button"
            @click="onSend">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit" class="tj-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'login',
  props: {},
  components: {},
  data () {
    return {
      // 这是输入框输入数据
      user: {
        mobile: '13911111111', // 默认数据
        code: '246810'
      },
      userRules: {
        mobile: [{ required: true, message: '手机号不能为空' }, { pattern: /1[3|5|7|8]|[9]\d{9}/, message: '手机号格式错误' }],
        code: [{ required: true, message: '验证码不能为空' }, { pattern: /\d{6}/, message: '验证码格式错误' }]
      },
      isBtnShow: false

    }
  },
  methods: {
    // 这是表单提交事件

    async onSubmit () {
      // 获取表单数据验证表单数据

      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 持续时间如果为0持续展示
      })
      try {
        const { data } = await login(user)
        this.$toast.success('登录成功')
        // 登录成功跳转
        this.$router.back()
        // console.log(data)
        this.$store.commit('setUser', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败手机或验证码错误')
        } else {
          this.$toast.fail('登录失败' + err.response.status)
        }
      }
    },
    // 发送验证码事件
    async onSend () {
      // 验证手机号正确,发送请求显示倒计时
      try {
        await this.$refs.loginFrom.validate('mobile') // 验证手机号是否正确使用ref获取from的dom使用方法validate
        // console.log('验证通过')显示倒计时
      } catch (err) {
        // 验证失败
        return console.log('')
      }
      this.isBtnShow = true
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        this.isBtnShow = false // 发送失败关闭倒计时
        if (err.response.status === 429) {
          this.$toast.fail('发送验证码频繁')
        } else {
          this.$toast.fail('发送验证码失败')
        }
      }
    }
  }

}
</script>

<style scoped lang="less">
.iconfont {
  font-size: 20px;
}

.btn-bg {
  background-color: #ededed;
  width: 100px;
  height: 22px;
  text-align: center;
  line-height: 32px;
}

.tj-btn {
  background-color: #66b1ff;
  border: 0;
  border-radius: 5px;
}

.login {
  .iconff {
    color: #fff;
    font-size: 16px;
  }
}
</style>
