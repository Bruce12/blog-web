import Vue, { DirectiveOptions } from 'vue'
import { init, bind } from '@/utils/life-cycle'
import 'normalize.css'
import './styles/index.less'
import router from './router'
import './permission'
// import * as directives from '@/directives'
import App from './App.vue'
init()
// Register global filter functions
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, (filters as { [key: string ]: Function })[key])
// })

// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

// 没有生效
bind(vm)
