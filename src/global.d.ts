import { RouteConfig } from 'vue-router'

interface IMeta {
  title?: string
  icon?: string
  hidden?: boolean
  alwaysShow?: boolean
  breadcrumb?: boolean
  noCache?: boolean
  affix?: boolean
  activeMenu?: string
  single?: boolean
  roles?: Array<'admin' | 'editor'>
  viewKey?: string
}

interface IRconfig extends RouteConfig {
  meta: IMeta
}

export interface IRouter {
  [propName: string]: IRconfig
}
