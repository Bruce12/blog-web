import Vue from 'vue'

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import elementUi from 'element-ui'
// import * as filters from '@/filters'
import router from './router'
// import * as directives from '@/directives'
import App from './App.vue'
import './permission'
// import * as directives from '@/directives'
Vue.use(elementUi)

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
  render: (h) => h(App)
}).$mount('#app')
