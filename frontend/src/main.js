import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSocketio from 'vue-socket.io';
import HighchartsVue from 'highcharts-vue'

Vue.use(VueRouter)
Vue.use(VueSocketio, 'http://localhost:3000/');
Vue.use(HighchartsVue)

import App from './App.vue'
import routes from './routes'

import store from './store'

require('semantic-ui-css/semantic.css')

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: "history"
})

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
