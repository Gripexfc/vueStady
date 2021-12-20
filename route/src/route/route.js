
let Vue;

class VueRouter {
    constructor(option) {
        //传入routeList参数
        this.$option = option;
        //使用defineReactive将数据变成响应式，使render函数随着数据改变更新
        Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')
        this.current = window.location.hash.slice(1) || '/'
        window.addEventListener('hashchange',()=>{
            // 保存当前页面路径
            this.current = window.location.hash.slice(1) || '/'
        })
    }
}

VueRouter.install = function(_vue) {
    //定义install方法，开发插件   可参考: https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6
    Vue = _vue;

    Vue.mixin({beforeCreate() {
        //使用混入方法在每个组件beforeCreate生命周期中，将router实例挂在在vue原型上
        if (this.$options.route) {
            Vue.prototype.$route = this.$options.route
        }
    }})
    //通过component注册两个组件   kroute-view kroute-link  实现route-view  route-link
    Vue.component('kroute-view', {
        render(h) {
            //render函数参考： https://cn.vuejs.org/v2/guide/render-function.html
            let component = null;
            //通过当前页面的路径匹配vueRouter中对应的组件实例，通过render函数渲染
            let route = this.$route.$option.routes.find(route=> route.path === this.$route.current)
            if (route) {
                component = route.component;
            }
            
            return h(component)
        }
    })

    Vue.component('kroute-link', {
        //自定义组件props流入数据  <kroute-link to='/home'></kroute-link>
        props: {
            to: {
                type: String,
                default: '/'
            }
        },
        render(h) {
            //向组件中传递不带 v-slot 指令的子节点时，比如 kroute-link 中的 home，这些子节点被存储在组件实例中的 $slots.default 中。
            return h('a',  {
                attrs: {
                    href: '#' + this.to
                },
            },this.$slots.default)
        }
    })
}

export default VueRouter;

