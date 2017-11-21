// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App'
import router from './router'


import store from './store'
import "@/components/CountdownTimer.js"
import "@/components/WizardSteps.js"
import "@/components/WalletSelector.js"
import "@/components/WalletInstructor.js"

Vue.config.productionTip = false

Vue.use(VueClipboard)


/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  router,
  template: '<App/>',
  components: { App },
  mounted: function() {
      let referrer = this.$route.query.referrer
      if(referrer){
        this.$store.dispatch('setReferrer', referrer)
      }
  },
})
