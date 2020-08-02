import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Route } from 'vue-router'
import { PermissionModule } from './store/modules/permission'

NProgress.configure({ showSpinner: true })

router.beforeEach(async(to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start()
  if (!PermissionModule.inited) {
    // 初始化路由
    PermissionModule.GenerateRoutes()
    router.addRoutes(PermissionModule.routes)
    next({ ...to, replace: true })
  } else {
    next()
  }
  // Determine whether the user has logged in
})

router.afterEach((to: Route) => {
  // Finish progress bar
  document.title = to.meta.title
  NProgress.done()
})
