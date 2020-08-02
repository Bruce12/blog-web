import Vue from 'vue'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import i18n from './lang'
import elementUi from 'element-ui'
import { AppModule } from './store/modules/app'
import store from './store'
import SvgIcon from 'vue-svgicon'
import '@/utils/error-log'
import '@/icons/components'
// import * as filters from '@/filters'
import router from './router'
// import * as directives from '@/directives'
import App from './App.vue'
import './permission'
// import * as directives from '@/directives'

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.use(elementUi, {
  size: AppModule.size, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})
// Vue.use(Button)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Register global directives
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

// Register global filter functions
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, (filters as { [key: string ]: Function })[key])
// })

// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App)
}).$mount('#app')
