<template>
  <div class="cont-main">
  <div class="logo">
    <img src="/static/images/logo.png" alt="">
  </div>
  <div class="contribute-status-bar">
    <div class="status-line"></div>
    <div class="oval-green">
      <img class="oval-ok" src="/static/images/ok icon.svg"/>
    </div>
    <div class="oval-green oval2">
      <img class="oval-ok" src="/static/images/ok icon.svg"/>
    </div>
    <div class="oval oval3">
      <div class="oval-txt">3</div>
    </div>
    <div class="oval oval4">
      <div class="oval-txt">4</div>
    </div>
    <div class="status-bar-txt">
      <span class="confirm">CONFIRM</span>
      <span class="select-wallet">SELECT YOUR WALLET</span>
      <span class="contribute">CONTRIBUTE</span>
      <span class="ref-link">YOUR REFERAL LINK</span>
    </div>
  </div>
  
  <div class="choose-the-wallet">VYRAL NETWORK CONTRIBUTION ADDRESS</div>
  
  <p class="txt2"> Do not send ETH from exchanges. We recommending using MetaMask, MyEtherWallet, Mist or other ERC-20 compatible wallets.</p>
  
  <div class="qrcode-container">
    <p>Please send your contribution to the following address or QR code. Recommended Gas amount: 200,00</p>
    <img src="/static/images/qr_code.jpg" alt="">
    <div class="input-grp">
      <input type="text" placeholder="Contract ETH Address" v-model="contractAddress"/>
      <button type="button"
      v-clipboard:copy="contractAddress"
      v-clipboard:success="contractAddressCopySuccess"
      v-clipboard:error="contractAddressCopyError">COPY</button>
    </div>
  </div>
  
  <p class="footer-txt">Get your referal Link once you have Complated your transaction</p>
  
  <button class="transparent-btn">CLAIM MY REFERAL LINK</button>
  
</div>
</template>

<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import { getWeb3, getNetworkVersion  } from '../utils/BlockchainHelpers'
  import { VyralConfig } from '../utils/Config'
  import {getEncodedABIClientSide} from '../utils/MicroServices'

  Vue.use(VueClipboard)

  export default {
    name: 'ContibutePage',
    beforeCreate () {
      console.log('Before Create')
    },

    created () {
      // Check if Web3 is installed via Metamask or Mist
      setTimeout(() => {
        getWeb3((web3) => {
          getNetworkVersion(web3, (networkID) => {
            console.log(networkID);
            if (networkID !== VyralConfig.networks.mainnet) {
              alert("Please switch to Ethereum Mainnet.")
            } else{
              console.log('Great, you are on Ethereum Mainnet')
              this.isNetworkConnected = true;

            }
          })
        })
      }, 500);
    },

    data () {
      return {
        contractAddress: VyralConfig.contractAddress
      };
    },
    methods: {
      contribute: function () {
        if(! this.isNetworkConnected) return;

        const data = {};
        getEncodedABIClientSide(web3, VyralConfig.abi, data, function(){
          alert("here");
        });
      },

      contractAddressCopySuccess: function(e){
        alert("Copied: "+ e.text);
      },


      contractAddressCopyError: function(e){
        alert("Error");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
