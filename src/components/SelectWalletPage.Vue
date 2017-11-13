<template>
<div class="meta-main">
  <div class="logo">
    <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
  </div>

  <wizard-steps current="SELECT_WALLET"></wizard-steps>
  
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
    <a class="btn red-btn large" @click="walletSelected()" v-bind:disabled="!selectedWallet">Continue To Contribute</a>
    <!-- <router-link :to="{ name: 'ContributePage' }" class="btn red-btn large">Continue To Contribute</router-link> -->
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
