import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
// import Layout from '@/layout/index.vue'
Vue.use(Router)
export const constantRoutes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/index',
    component: () => import(/* webpackChunkName: "vender" */'../views/index.vue')
  },
  {
    path: '/index',
    component: () => import(/* webpackChunkName: "vender" */'../views/index.vue'),
    meta: {
      title: '首页'
    }
  }
]
const createRouter = () => new Router({
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export default router
