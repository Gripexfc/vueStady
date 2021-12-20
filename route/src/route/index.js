import VueRouter from "./route";
import home from "../components/home.vue";
import my from "../components/my.vue";
import Vue from 'vue'
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

export default route

