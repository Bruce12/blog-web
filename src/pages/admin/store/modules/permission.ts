import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/pages/admin/router'
import Layout from '@/pages/admin/layout/index.vue'
// import asyncRoutes from '@/pages/admin/router/routes'
import store from '../index'

export const filterAsyncRoutes = (routes: RouteConfig[]): RouteConfig[] => {
  const res: RouteConfig[] = []
  const otherRoutes: RouteConfig[] = []
  routes.forEach(route => {
    if (route.children) {
      route.children = filterAsyncRoutes(route.children)
    }
    res.push(route)
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  inited: boolean
}

@Module({ namespaced: true, dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
   public routes: RouteConfig[] = []
   public inited: boolean = false
   @Mutation
   private SET_ROUTES(routes: RouteConfig[]) {
     this.routes = constantRoutes.concat(routes)
     this.inited = true
   }
   @Action
   public GenerateRoutes() {
     let accessedRoutes = filterAsyncRoutes(asyncRoutes)
     console.log('accessedRoutes', accessedRoutes)
     this.SET_ROUTES(accessedRoutes)
   }
}
export const PermissionModule = getModule(Permission)
