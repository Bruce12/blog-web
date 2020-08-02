import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Layout from '../layout/index.vue'

/* Layout */
// import Layout from '@/layout/index.vue'
Vue.use(Router)
export const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: '/index',
      component: () => import(/* webpackChunkName: "vender" */'../views/index/index.vue'),
      name: 'index',
      meta: {
        title: '首页'
      }
    }]
  }
  // ,
  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "vender" */'../views/error_page/index.vue'),
  //   meta: {
  //     hidden: true
  //   }
  // }
]

const createRouter = () => new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export default router
