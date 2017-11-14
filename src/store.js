import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)



export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        selectedWallet: 'METAMASK',
        termsAgreed: false,
        contributed: false
    },
    getters: {
    termsAgreed(state){
        return state.termsAgreed
    },

    selectedWallet(state){
        return state.selectedWallet
    }
},
    actions: {},
    mutations: {
    setAgreedTerms(state, hasAgreed){
        state.termsAgreed = hasAgreed
    },
    selectWallet(state, wallet){
        state.selectedWallet = wallet
    }
}
})