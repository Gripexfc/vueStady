let Vue;

class Store{
    constructor (option){
        this.$option = option;
        this.state = new Vue({
            data: function() {
                return option.state
            }
        })
    }
}


function install(_vue) {
    Vue = _vue;

    Vue.mixin({beforeCreate() {
        if(this.$options.store) {
            console.log(Vue.$options.store,'Vue')
            Vue.prototype.$store = this.$options.store;
        }
    }})
}


export default {Store, install}