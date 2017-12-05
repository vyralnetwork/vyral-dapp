<template>
<div class="meta-main">
  <div class="container">
    <div class="logo">
      <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
    </div>

    <wizard-steps current="SELECT_WALLET"></wizard-steps>
    
    <p class="choose-the-wallet">CHOOSE THE WALLET YOU WISH TO PURCHASE WITH</p>
    

    <div class="row wallet-warning text-center margin-top-lg">
      <p class="col-md-6 col-md-offset-3">
        Please ensure you are using an ERC-20 compatible wallet and you are not sending from an exchange. Sending from an exchange will cause you to not receive any tokens and lose your entire purchase.
      </p>
    </div>

    <wallet-selector :selectedWallet="selectedWallet" @walletSelected="walletSelected"></wallet-selector>

    <div class="row">
      <p class="text-center well well-sm text-info col-md-8 col-md-offset-2" v-show="selectedWallet === 'METAMASK' && metamaskDisabled">
          <i class="fa fa-exclamation-triangle"></i>
          You have selected MetaMask but not installed it.
          <a class="btn btn-info btn-sm metamask-install-btn" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">Install MetaMask</a>
      </p>

      <p class="text-center well well-sm text-info col-md-8 col-md-offset-2" v-show="selectedWallet === 'METAMASK' && metamaskLocked">
          <i class="fa fa-exclamation-triangle"></i>
          Your MetaMask is locked. Please login to unlock MetaMask.
      </p>
    </div>

    <p class="footer-txt">Coinbase, Bittrex, Poloniex, Kraken, Bitfinex, Freewallet & all other exchanges are NOT compatible.</p>

    <div class="text-center margin-top-xl" v-show="!(selectedWallet === 'METAMASK' && (metamaskDisabled || metamaskLocked))">
      <button class="btn btn-md btn-primary" v-bind:class="{'disabled': !selectedWallet}" @click="redirectToContributePage()" v-bind:disabled="!selectedWallet">Continue To Purchase</button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'SelectWalletPage',

    data(){
      return {
        metamaskDisabled: false,
        metamaskLocked: false,
        metamaskStatusChecker: ""
      }
    },

    components: {
      'selected-wallet': 'selected-wallet'
    },

    mounted() {
      // check if user has agreed to all the terms or not
      // if not, redirect to Home page
      // TODO: Move this to before enter route filter
      if(! this.$store.getters.termsAgreed){
        this.$router.push({name: "AgreeTermsPage"})
      }

      this.metamaskStatusChecker = setInterval(this.checkMetaMaskStatus, 1000)
    },

    unmounted(){
        console.log("unmounted")
        clearInterval(this.metamaskStatusChecker)
    },


    computed: {
        selectedWallet(){
          return this.$store.getters.selectedWallet
        }
    },


    methods: {

        checkMetaMaskStatus(){
            this.metamaskDisabled = false
            this.metamaskLocked = false

            if(typeof web3 === 'undefined'){
                this.metamaskDisabled = true
            } else if(typeof web3 !== 'undefined' && typeof web3.eth.defaultAccount === 'undefined'){
                this.metamaskLocked = true
            }
        },

      walletSelected(selectedWallet) {
        this.$store.dispatch('setWallet', selectedWallet)
      },

      redirectToContributePage(){
        this.$router.push({
          name: 'ContributePage'
        })
      }
    },
  }
</script>


<style type="text/css">
.metamask-install-btn{
  margin-left: 30px;
}
input[type='radio']{
  display: none;
}
</style>