import axios from 'axios'
import store from '@/store/index.js'

import jsonBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  // baseURL: 'http://ttapi.research.itcast.cn'
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么config:本次请求的配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config // 必须return出去config对象不然会中端
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦截器
export default request
