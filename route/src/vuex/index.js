import Vue from 'vue'
import vuex from './vuex';

Vue.use(vuex)

export default new vuex.Store({
    state: {
        curre: 0
    },
    actions: {
        setState({commit}) {
            commit('add', 1)
        }
    },
    mutations: {
        add(state, payload) {
            state.curre += payload;
            console.log(state.curre,'state.curre')
        }
    },
    getters: {
        computedData: ()=>{
            return state.curre
        }
    }
})