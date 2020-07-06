declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}

declare module '*.gif' {
  export const gif: any
}
declare module 'highlight.js' {
  export const hijs: any
}
// // TODO: remove this part after vue-count-to has its typescript file
// declare module 'vue-count-to'

// // TODO: remove this part after vuedraggable has its typescript file
// declare module 'vuedraggable'

// // TODO: remove this part after vue2-dropzone has its typescript file
// declare module 'vue2-dropzone'

// // TODO: remove this part after vue-image-crop-upload has its typescript file
// declare module 'vue-image-crop-upload'

// // TODO: remove this part after vue-splitpane has its typescript file
// declare module 'vue-splitpane'
declare module 'Ajax' {
  import { AxiosRequestConfig } from 'axios'
  export interface IResponseData<T = any> extends IData<T> {}
  export interface IResponseRawData<T = any> extends IRawResult<T> {}
  export interface IData<T = any> {
    data: T
    status: number
    success: boolean
    msg?: string
  }
  interface IRawResult<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request?: any
  }
}
interface ICv {
  code: string
  value: string
  selected?: boolean
}
interface IPage {
  page: number
}
