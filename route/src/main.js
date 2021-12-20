import Vue from 'vue'
import App from './App.vue'
import VueRouter from "./route/route";
import home from "./components/home.vue";
import my from "./components/my.vue";
//use相当于VueRouter.install方法的调用，并传入两个参数 第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：options
Vue.use(VueRouter)
let routeList = {
    routes: [
        {
            path: '/home',
            component: home
        },
        {
            path: '/my',
            component: my
        }
    ]
}

const route = new VueRouter(routeList)

Vue.config.productionTip = false

  new Vue({
    route,
    render: h => h(App),
  }).$mount('#app')
