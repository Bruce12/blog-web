import { RouteConfig } from 'vue-router'
import Layout from '../../layout/index.vue'

/**
 * 兰建华的路由
 */
const ljhRouter: RouteConfig = {
  path: '/ljh',
  component: Layout,
  redirect: '/ljh/snake',
  name: 'rll',
  meta: {
    title: 'LJH',
    icon: 'icon'
  },
  children: [
    {
      path: '/snake',
      component: () => import(/* webpackChunkName: "verder_rll" */'@/pages/admin/views/snake/index.vue'),
      name: 'snake',
      meta: {
        title: 'snake'
      }
    },
    {
      path: '/snaked',
      component: () => import(/* webpackChunkName: "verder_rll" */'@/pages/admin/views/snake/index.vue'),
      name: 'snake',
      meta: {
        title: 'snake'
      }
    }
  ]
}

export default ljhRouter
