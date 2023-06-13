import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)
const tokenkey = 'TOUTIAO'
export default new Vuex.Store({
  state: {
    // 一个对象用来存储当前登录用户信息(token等)
    user: getItem(tokenkey),
    active: getItem('active')
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 备份本地
      // window.localStorage.setItem(tokenkey, JSON.stringify(state.user))
      setItem(tokenkey, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
