class Store{
    constructor (option){
        this.$option = option;
    }
}

let Vue;

function install(_vue) {
    Vue = _vue;
    
    Vue.mixin({beforecreate() {
        if(Vue.$option.store) {
            Vue.prototype.$Store = Vue.$option.store;
        }
    }})
}


export default {Store, install}