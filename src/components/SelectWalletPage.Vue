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
  


  <ul class="wallet-container">
    <li class="wallet-type">
      <label class="checkbox">
        <input type="radio" v-model="selectedWallet" value="MYETHERWALLET"/>
        <img src="/static/images/myetherwallet-logo.png" class="ether"/>
        <span class="label">MyEtherWallet</span>
      <span class="active" v-if="selectedWallet == 'MYETHERWALLET'"></span>
      </label>
    </li>


    <li class="wallet-type">
      <span class="recommended">Recommended</span>

      <label class="checkbox">
        <input type="radio" v-model="selectedWallet" value="METAMASK"/>
        <img src="/static/images/metamask.png" class="ether"/>
        <span class="label">Metamask</span>
        <span class="active" v-if="selectedWallet == 'METAMASK'"></span>
      </label>
    </li>


    <li class="wallet-type">
      <label class="checkbox">
        <input type="radio" v-model="selectedWallet" value="PARITY"/>
        <img src="/static/images/parity.png" class="parity">
        <span class="label">Parity</span>
        <span class="active" v-if="selectedWallet == 'PARITY'"></span>
      </label>
    </li>


    <li class="wallet-type">
      <label class="checkbox">
        <input type="radio" v-model="selectedWallet" value="IAMTOKEN"/>
        <img src="/static/images/i am token.png" class="ether">
        <span class="label">Iam Token</span>
        <span class="active" v-if="selectedWallet == 'IAMTOKEN'"></span>
      </label>
    </li>


    <li class="wallet-type">
      <label class="checkbox">
        <input type="radio" v-model="selectedWallet" value="JAXX"/>
        <img src="/static/images/jaxx.png" class="jaxx">
        <span class="label">Jaxx</span>
        <span class="active" v-if="selectedWallet == 'JAXX'"></span>
      </label>
    </li>


    <li class="wallet-type">
      <label class="checkbox">
        <input type="radio" v-model="selectedWallet" value="MIST"/>
        <img src="/static/images/MIST.png" class="mist">
        <span class="label">Mist</span>
        <span class="active" v-if="selectedWallet == 'MIST'"></span>
      </label>
    </li>
  </ul>

  <p class="footer-txt">Coinbase, Bittrex, poloniex, kraken, bitfinex,& all other exchanges are not compatible</p>

  <div class="text-center margin-top-xl">
    <button class="red-btn large" @click="walletSelected()" v-bind:disabled="!selectedWallet">Continue To Contribute</button>
    <!-- <router-link :to="{ name: 'ContributePage' }" class="red-btn large">Continue To Contribute</router-link> -->
  </div>
</div>
</template>

<script>
  export default {
    name: 'SelectWalletPage',
    data () {
      return {
        selectedWallet: "METAMASK"
      }
    },
    methods: {
      walletSelected: function () {
        this.$router.push({
          name: 'ContributePage'
        })
      }
    }
  }
</script>
