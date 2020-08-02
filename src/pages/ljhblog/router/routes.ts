import { IRouter } from '@/global'

const router: IRouter = {
  index: {
    path: '/index',
    component: () => import(/* webpackChunkName: "vender" */'../views/index/index.vue'),
    meta: {
      title: '首页'
    }
  },
  note: {
    path: '/note',
    component: () => import(/* webpackChunkName: "vender" */'../views/note/index.vue'),
    meta: {
      title: '笔记本'
    }
  }
}
export default router
