
let Vue;

class kroute {
    constructor(option) {
        //传入routeList参数
        this.$option = option;
        Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')
        window.addEventListener('hashchange',()=>{
            this.current = window.location.hash.slice(1) || '/'
        })
    }
}

kroute.install = function(_vue) {
    Vue = _vue;

    Vue.mixin({beforeCreate() {
        if (this.$options.route) {
            Vue.prototype.$route = this.$options.route
        }
    }})
    Vue.component('kroute-view', {
        render(h) {
            let component = null;
            let route = this.$route.$option.routes.find(route=> route.path === this.$route.current)
            if (route) {
                component = route.component;
            }

            return h(component)
        }
    })

    Vue.component('kroute-link', {
        props: {
            to: {
                type: String,
                default: '/'
            }
        },
        render(h) {
            return h('a',  {
                attrs: {
                    href: '#' + this.to
                },
                on: {
                    click: ()=>{
                        
                    }
                }
            },this.$slots.default)
        }
    })
}

export default kroute;

