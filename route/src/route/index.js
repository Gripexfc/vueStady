import kroute from "./route";
import home from "../components/home.vue";
import my from "../components/my.vue";

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

const route = new kroute(routeList)


export default route

