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
/**
 * 添加关注
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}
/**
 * 获取登录用户信息
 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/profile'
  })
}
/**
 * 更新用户资料
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
/**
 * 更新用户照片资料
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
/**
 * 获取用户收藏
 */
export const getCollections = params => {
  return request({
    method: 'get',
    url: '/v1_0/article/collections',
    params
  })
}
/**
 * 获取浏览历史
 */
export const getHistories = params => {
  return request({
    method: 'get',
    url: '/v1_0/user/histories',
    params
  })
}
