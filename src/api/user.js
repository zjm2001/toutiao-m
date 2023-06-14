import request from '@/utils/request.js'
// import store from '@/store/index.js'
// 发起请求用户认证是否登录成功
export const login = data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送验证码每分钟只能一次
export const sendSms = mobile => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
  //  headers: {
    // Authorization: `Bearer ${store.state.user.token}` // 拿到vuex中存储在user里面的token
    // }
  })
}
// 获取频道列表
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}
