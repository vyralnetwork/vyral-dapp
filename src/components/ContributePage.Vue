<template>
  <div class="cont-main">
  <div class="logo">
    <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
  </div>

  <wizard-steps current="CONTRIBUTE"></wizard-steps>
  
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
  
  <div class="text-center margin-top-xl margin-bottom-xl">
    <router-link :to="{ name: 'ReferralLinkPage' }" class="transparent-btn">CLAIM MY REFERAL LINK</router-link>
  </div>
  
</div>
</template>

<script>
  import {getWeb3, getNetworkVersion} from '../utils/BlockchainHelpers'
  import {getEncodedABIClientSide} from '../utils/MicroServices'
  import {VyralConfig} from "../utils/Config"

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

              const data = {};
              getEncodedABIClientSide(web3, VyralConfig.abi, data, function(){
                alert("here");
              });
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
