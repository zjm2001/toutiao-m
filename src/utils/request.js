import axios from 'axios'
import store from '@/store/index.js'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
  // baseURL: 'http://ttapi.research.itcast.cn'
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
