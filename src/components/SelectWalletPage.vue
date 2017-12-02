<template>
<div class="meta-main">
  <div class="container">
    <div class="logo">
      <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
    </div>

    <wizard-steps current="SELECT_WALLET"></wizard-steps>
    
    <p class="choose-the-wallet">CHOOSE THE WALLET YOU WISH TO CONTRIBUTE WITH</p>
    

    <div class="row wallet-warning text-center margin-top-lg">
      <p class="col-md-6 col-md-offset-3">
        Please ensure you are using a ERC-20 compatible wallet and you don’t send contributions via exchanges. Otherwise we cannot guarantee you will receive your SHARE tokens properly.
      </p>
    </div>

    <wallet-selector :selectedWallet="selectedWallet" @walletSelected="walletSelected"></wallet-selector>

    <p class="text-center" v-show="selectedWallet === 'METAMASK' && metamaskDisabled">
      <small class="alert alert-warning">
        <i class="fa fa-exclamation-triangle"></i>
        Looks like you have not enabled MetaMask. Please enable and login if you wish to use Metamask.
      </small>
    </p>

    <p class="footer-txt">Coinbase, Bittrex, Poloniex, Kraken, Bitfinex, Freewallet & all other exchanges are not compatible.</p>

    <div class="text-center margin-top-xl">
      <button class="btn btn-md btn-primary" v-bind:class="{'disabled': !selectedWallet}" @click="redirectToContributePage()" v-bind:disabled="!selectedWallet">Continue To Contribute</button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'SelectWalletPage',

    data(){
      return {
        metamaskDisabled: typeof web3 === 'undefined'
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
    },


    computed: {
        selectedWallet(){
          return this.$store.getters.selectedWallet
        }
    },


    methods: {
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
input[type='radio']{
  display: none;
}
</style>