import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 2. 引入组件样式
import 'vant/lib/index.css'
// 加载全局样式
import '@/styles/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
