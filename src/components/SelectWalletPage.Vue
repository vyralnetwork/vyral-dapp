<template>
<div class="meta-main">
  <div class="logo">
    <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
  </div>

  <wizard-steps current="SELECT_WALLET"></wizard-steps>
  
  <p class="choose-the-wallet">CHOOSE THE WALLET YOU WISH TO CONTRIBUTE WITH</p>
  
  <p class="txt2"> Please ensure you are using a ERC-20 compatible wallet and you don’t send contributions via exchanges.</p>

  <wallet-selector :selectedWallet="selectedWallet" @walletSelected="walletSelected"></wallet-selector>

  <p class="footer-txt">Coinbase, Bittrex, poloniex, kraken, bitfinex,& all other exchanges are not compatible</p>

  <div class="text-center margin-top-xl">
    <button class="btn red-btn large" @click="redirectToContributePage()" v-bind:disabled="!selectedWallet">Continue To Contribute</button>
  </div>
</div>
</template>

<script>
  export default {
    name: 'SelectWalletPage',

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
