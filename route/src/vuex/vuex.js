let Vue;

class Store{
    constructor (option){
        this.$option = option;
        this._vm = new Vue({
            data: function() {
                return {
                    $$state: option.state
                }
            }
        })
        
        this._mutations = option.mutations;
        this._actions = option.actions;
        console.log(this._mutations,'mutations')
        console.log(this._actions,'option.actions')
        this.commit = this.commit.bind(this)
    }

    get state() {
        return this._vm._data.$$state;
    }
    set state(v) {
        console.error('请使用正确的修改方式')
    }

    commit(type, value) {
        // debugger
        console.log(this._mutations,'mutations')
        this._mutations[type](this.state, value)
    }

    dispatch(type) {
        // debugger
        const entry = this._actions[type];

        if(!entry) return;
        entry(this);
    }
}


function install(_vue) {
    Vue = _vue;

    Vue.mixin({beforeCreate() {
        if(this.$options.store) {
            Vue.prototype.$store = this.$options.store;
        }
    }})
}


export default {Store, install}