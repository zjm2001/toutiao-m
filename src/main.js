import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'github-markdown-css'
import store from './store'
// 2. 引入组件样式
import 'vant/lib/index.css'
// 加载全局样式
import '@/styles/index.less'
import '@/utils/dayjs.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
