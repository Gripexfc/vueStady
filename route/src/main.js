import Vue from 'vue'
import App from './App.vue'
import route from './route/index'
import store from './vuex/index'

//use相当于VueRouter.install方法的调用，并传入两个参数 第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：options


Vue.config.productionTip = false

  new Vue({
    route,
    store,
    render: h => h(App),
  }).$mount('#app')
