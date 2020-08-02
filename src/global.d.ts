import { RouteConfig, Route, NavigationGuard } from 'vue-router'
import { PathToRegexpOptions, Component, RoutePropsFunction } from 'vue-router/types/router'
// import Vue, { ComponentOptions, PluginFunction, AsyncComponent } from 'vue'
type Dictionary<T> = { [key: string]: T }
type RawLocation = string | Location
type RedirectOption = RawLocation | ((to: Route) => RawLocation)
interface RouteConfigBase {
  path: string
  name?: string
  children?: RouteConfig[]
  redirect?: RedirectOption
  alias?: string | string[]
  meta?: any
  beforeEnter?: NavigationGuard
  caseSensitive?: boolean
  pathToRegexpOptions?: PathToRegexpOptions
  components?: Dictionary<Component>
  component?: Component
  props?: boolean | Object | RoutePropsFunction | Dictionary<boolean | Object | RoutePropsFunction>
}
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

interface IRconfig extends RouteConfigBase {
  meta: IMeta
}

export interface IRouter {
  [propName: string]: IRconfig
}
