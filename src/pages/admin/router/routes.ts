import { IRouter } from '@/global'

const router: IRouter = {
  home: {
    component: () => import(/* webpackChunkName: "vender" */ '../views/home/index.vue'),
    path: '/home',
    meta: {
      title: '首页'
    }
  },
  hot_article: {
    component: () => import(/* webpackChunkName: "vender" */ '../views/hot_article/index.vue'),
    path: '/hot_article',
    meta: {
      title: '精选文章'
    }
  },
  snake: {
    component: () => import(/* webpackChunkName: "vender" */ '../views/snake/index.vue'),
    path: '/snake',
    meta: {
      title: '贪吃蛇'
    }
  },
  publish_article: {
    path: '/publish_article',
    component: () => import(/* webpackChunkName: "vender" */'../views/publish_article/index.vue'),
    meta: {
      title: '发布文章'
    }
  },
  interview_qust: {
    path: '/interview_qust',
    component: () => import(/* webpackChunkName: "vender" */'../views/interview_qust/index.vue'),
    meta: {
      title: '面试题汇总'
    }
  }
}
export default router
