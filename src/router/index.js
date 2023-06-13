import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '', // 留空默认子路由只能有一个
        name: 'home',
        component: () => import('@/views/home/index.vue')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      }, {
        path: '/videos',
        name: 'videos',
        component: () => import('@/views/videos/index.vue')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
