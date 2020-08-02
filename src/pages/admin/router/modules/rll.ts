import { RouteConfig } from 'vue-router'
import Layout from '../../layout/index.vue'

/**
 * 任两两的路由
 */
const rllRouter: RouteConfig = {
  path: '/rll',
  component: Layout,
  redirect: '/rll/write_article',
  name: 'rll',
  meta: {
    title: 'RLL',
    icon: 'star'
  },
  children: [
    {
      path: '/write_article',
      component: () => import(/* webpackChunkName: "verder_rll" */'@/pages/admin/views/write_article/index.vue'),
      name: 'writeArticle',
      meta: {
        title: 'llDiary'
      }
    },
    {
      path: '/interview_qust',
      component: () => import(/* webpackChunkName: "verder_rll" */'@/pages/admin/views/write_article/index.vue'),
      name: 'interviewQust',
      meta: {
        title: 'interviewQust'
      }
    }
  ]
}

export default rllRouter
