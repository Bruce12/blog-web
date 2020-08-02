import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Layout from '../layout/index.vue'
import rllRouter from './modules/rll'
import ljhRouter from './modules/ljh'

/* Layout */
// import Layout from '@/layout/index.vue'
Vue.use(Router)
export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "base_group" */ '../views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      component: () => import(/* webpackChunkName: "vender" */'../views/index/index.vue'),
      name: 'dashboard',
      meta: {
        title: 'Index',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "vender" */'../views/error_page/404.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "vender" */'../views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  }
]

// 需要加载的路由

export const asyncRoutes: RouteConfig[] = [
  rllRouter,
  ljhRouter,
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
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
