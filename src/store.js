import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
        key: "VyralDapp"
    })],

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

    mutations: {
        setTermsAgreed(state, hasAgreed){
           state.termsAgreed = hasAgreed
        },
        setWallet(state, walletType){
            state.selectedWallet = walletType
        }
    },

    actions: {
        setTermsAgreed(context, hasAgreed){
            context.commit('setTermsAgreed', hasAgreed)
        },

        setWallet(context, walletType){
            context.commit('setWallet', walletType)
        }
    },
})