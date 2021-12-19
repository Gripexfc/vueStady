import Vue from 'vue'
import App from './App.vue'
import kroute from './route/route'
import route from './route/index'
Vue.use(kroute)
Vue.config.productionTip = false

new Vue({
  route,
  render: h => h(App),
}).$mount('#app')
