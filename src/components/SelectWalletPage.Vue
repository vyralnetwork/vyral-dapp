<template>
<div class="meta-main">
  <div class="logo">
    <img src="/static/images/logo.png" alt="">
  </div>

  <div class="contribute-status-bar">
    <div class="status-line"></div>
    <div class="oval-green">
      <img class="oval-ok" src="/static/images/ok icon.svg"/>
    </div>
    <div class="oval oval2">
      <div class="oval-txt">2</div>
    </div>
    <div class="oval oval3">
      <div class="oval-txt">3</div>
    </div>
    <div class="oval oval4">
      <div class="oval-txt">4</div>
    </div>
    <div class="status-bar-txt">
      <span class="confirm" >CONFIRM</span>
      <span class="select-wallet">SELECT YOUR WALLET</span>
      <span class="contribute">CONTRIBUTE</span>
      <span class="ref-link">YOUR REFERAL LINK</span>
    </div>
  </div>
  
  <p class="choose-the-wallet">CHOOSE THE WALLET YOU WISH TO CONTRIBUTE WITH</p>
  
  <p class="txt2"> Please ensure you are using a ERC-20 compatible wallet and you don’t send contributions via exchanges.</p>
  
  
  
  <div class="img-bar">
    <div>
      <img src="/static/images/myetherwallet-logo.png" class="ether"/>
      <span >MyEtherWallet</span>
    </div>
    <div>
      <span class="recom-txt">Recommended</span>
      <img src="/static/images/metamask.png" class="metamask">
      <span>Metamask</span>
      <span class="selector"></span>
    </div>
    <div>
      <img src="/static/images/parity.png" class="parity">
      <span >Parity</span>
    </div>
    <div>
      <img src="/static/images/i am token.png" class="ether">
      <span >Iam Token</span>
    </div>
    <div><img src="/static/images/jaxx.png" class="jaxx"></div>
    <div><img src="/static/images/MIST.png" class="mist"></div>
    
  </div>
  
  
  <p class="footer-txt">Coinbase, Bittrex, poloniex, kraken, bitfinex,& all other exchanges are not compatible</p>
  

  <div class="text-center margin-top-xl">
    <router-link :to="{ name: 'ContributePage' }" class="red-btn large">Continue To Contribute</router-link>
  </div>
  
</div>
</template>

<script>
  export default {
    name: 'SelectWalletPage',
    data () {
      return {

      }
    },
    methods: {
      contribute: function () {
        this.$router.push({
          name: 'ContributePage'
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
