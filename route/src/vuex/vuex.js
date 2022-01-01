let Vue;

class Store{
    constructor (option){
        this.$option = option;
        
        this._mutations = option.mutations;
        this._actions = option.actions;
        this._getters = option.getters;

        //对方法进行绑定,调用当前上下文
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
        let computed = {};
        Object.keys(this._getters).forEach(key =>{
            //getters利用vue中computed实现在vuex中的计算属性
            //参考https://github1s.com/vuejs/vuex/blob/HEAD/src/store.js#L294   {L: 294行}
            computed[key] = this._getters[key];
            Object.defineProperty(this._getters, key, {
                get: ()=>  this._getters[key](),
                enumerable: true 
            })
        })

        //通过new vue将数据变成响应式
        this._vm = new Vue({
            data: function() {
                return {
                    //不希望用户看到data使用$$隐藏
                    $$state: option.state
                }
            },
            computed
        })
    }
    get getters() {
        return this._getters
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