import Vue from 'vue'
import Router from 'vue-router'
import AgreeTermsPage from '@/components/AgreeTermsPage'
import SelectWalletPage from '@/components/SelectWalletPage'
import ContributePage from '@/components/ContributePage'
import ReferralLinkPage from '@/components/ReferralLinkPage'
import "@/components/CountdownTimer.js"
import "@/components/WizardSteps.js"

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'AgreeTermsPage',
    component: AgreeTermsPage
  },
  {
    path: '/select-wallet',
    name: 'SelectWalletPage',
    component: SelectWalletPage
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
