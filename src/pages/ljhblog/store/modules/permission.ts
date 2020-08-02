import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { constantRoutes } from '../../router'
import Layout from '../../layout/index.vue'
import asyncRoutes from '../../router/routes'
import store from '../index'
import { IRouter } from '@/global'

export const generateRoutes = (data: IRouter): RouteConfig[] => {
  const routes: RouteConfig[] = []
  const childrenRouter: RouteConfig[] = []
  for (const key in data) {
    const item = (data as any)[key]
    item.name = key
    childrenRouter.push(item)
  }
  routes.push({
    name: 'root-hidden',
    path: '/root-hidden',
    component: Layout,
    meta: {
      hidden: true
    },
    children: childrenRouter
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
    this.SET_ROUTES(generateRoutes(asyncRoutes))
  }
}
export const PermissionModule = getModule(Permission)
