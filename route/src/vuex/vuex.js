let Vue;

class Store{
    constructor (options){
        this.$options = options;
        
        this._mutations = options.mutations;
        this._actions = options.actions;
        this._getters = options.getters || {}

        //对方法进行绑定,调用当前上下文
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
        let computed = {};
        this.getters = {};

        const store = this;

        Object.keys(this._getters).forEach(key =>{``
        //     //getters利用vue中computed实现在vuex中的计算属性
        //     //参考https://github1s.com/vuejs/vuex/blob/HEAD/src/store.js#L294   {L: 294行}
            const fn = store._getters[key]
            computed[key] = function() {
                return fn(store.state);
            };
            Object.defineProperty(store.getters, key, {
                get: () =>  store._vm[key],
                enumerable: true 
            })
        })
        //通过new vue将数据变成响应式
        this._vm = new Vue({
            data: function() {
                return {
                    //不希望用户看到data使用$$隐藏
                    $$state: options.state
                }
            },
            computed
        })
    }
    get state() {
        return this._vm._data.$$state;
    }
    //不希望用户直接修改state
    set state(v) {
        console.error('请使用正确的修改方式')
    }

    commit(type, value) {
        const entry = this._mutations[type];

        if(!entry) return;
        entry(this.state, value)
    }

    dispatch(type) {
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