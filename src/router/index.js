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
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    props: true, // 开启props传参
    component: () => import('@/views/article/index.vue')
  },
  {
    name: 'user-profile',
    path: '/user/profile',
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home', // 留空默认子路由只能有一个
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
