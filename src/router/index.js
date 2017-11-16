import Vue from 'vue'
import Router from 'vue-router'

import AgreeTermsPage from '@/components/AgreeTermsPage'
import SelectWalletPage from '@/components/SelectWalletPage'
import ContributePage from '@/components/ContributePage'
import ReferralLinkPage from '@/components/ReferralLinkPage'


// import vueConfig from 'vue-config'
// const config = require("../utils/Config")



Vue.use(Router)
// Vue.use(vueConfig, config)


const routes = [
  {
    path: '/',
    name: 'AgreeTermsPage',
    component: AgreeTermsPage,
    beforeEnter: (to, from, next) => {
      next()
    }
  },
  {
    path: '/select-wallet',
    name: 'SelectWalletPage',
    component: SelectWalletPage,
    // beforeEnter(to, from, next) => {
    //   if(!this.$store.getters.termsAgreed){
    //     //redirect back
    //   }
    // }
  },
  {
    path: '/contribute',
    name: 'ContributePage',
    component: ContributePage
  },
  {
    path: '/referral-link',
    name: 'ReferralLinkPage',
    component: ReferralLinkPage
  }
];

export default new Router({
  routes: routes,
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
})
