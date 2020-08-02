import Vue from 'vue'
import router from './router'
import App from './App.vue'
Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
