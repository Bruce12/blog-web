import { IRouter } from '@/global'

const router: IRouter = {
  index: {
    path: '/index',
    component: () => import(/* webpackChunkName: "vender" */'../views/index/index.vue'),
    meta: {
      title: '首页'
    }
  }
}
export default router
