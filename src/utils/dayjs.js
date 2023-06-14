import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包 默认是英文
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用
// dayjs().format('YYYY-MM-DD')
// dayjs().from(dayjs('1990')) // 2 years ago
// dayjs().from(dayjs(), true) // 2 years
//
// dayjs().fromNow()
//
// dayjs().to(dayjs())
//
// dayjs().toNow()
// 定义一个全局过滤器,然后就可以再任何组件
// Vue.filter('relativeTime', value => {
// //   return dayjs().to(dayjs(value))
//   return 22
// })
Vue.filter('rev', val => {
  return dayjs().to(dayjs(val))
})
