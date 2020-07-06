import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { constantRoutes } from '@/pages/admin/router'
import Layout from '@/pages/admin/layout/index.vue'
import asyncRoutes from '@/pages/admin/router/routes'
import store from '@/store'
import { IRouter } from '@/global'

export const filterRoutes = (data: IRouter): RouteConfig[] => {
  const routes: RouteConfig[] = []
  const otherRoutes: RouteConfig[] = []
  for (const key in data) {
    const item = (data as any)[key]
    item.name = key
    otherRoutes.push(item)
  }
  routes.push({
    name: 'root-hidden',
    path: '/root-hidden',
    component: Layout,
    meta: {
      hidden: true
    },
    children: otherRoutes
  })
  routes.push({
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  })
  return routes
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
   public getRouters() {
     this.SET_ROUTES(filterRoutes(asyncRoutes))
   }
}
export const PermissionModule = getModule(Permission)
