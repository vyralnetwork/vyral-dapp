<template>
  <div class="cont-main">
  <div class="logo">
    <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
  </div>

  <wizard-steps current="CONTRIBUTE"></wizard-steps>
  
  <div class="choose-the-wallet">VYRAL NETWORK CONTRIBUTION ADDRESS</div>
  
  <p class="txt2">Do not send ETH from exchanges. We recommending using MetaMask, MyEtherWallet, Mist or other ERC-20 compatible wallets.</p>
  
  <div class="qrcode-container">
    <p>Please send your contribution to the following address or QR code. Recommended Gas amount: 200,00</p>
    <!-- <canvas id="qrcode"></canvas> -->
    <div class="input-grp">
      <input type="text" placeholder="Contract ETH Address" v-model="contractAddress"/>
      <button type="button"
      v-clipboard:copy="contractAddress"
      v-clipboard:success="contractAddressCopySuccess"
      v-clipboard:error="contractAddressCopyError">COPY</button>
    </div>
  </div>


  <wallet-instructor :selectedWallet="selectedWallet"></wallet-instructor>
  
  <p class="footer-txt">Get your referal Link once you have Complated your transaction</p>
  
  <div class="text-center margin-top-xl margin-bottom-xl">
    <router-link :to="{ name: 'ReferralLinkPage' }" class="transparent-btn">CLAIM MY REFERAL LINK</router-link>
  </div>
  
</div>
</template>

<script>
  import {VyralConfig} from "../utils/Config"
  var abi = require("../contracts/VyralSale.json")

  export default {
    name: 'ContributePage',

    mounted(){
      if(! this.$store.getters.termsAgreed){
          this.$router.push({name: "AgreeTermsPage"})
      } else if(! this.$store.getters.selectedWallet){
          this.$router.push({name: "SelectWalletPage"})
      }


      // If user has selected Metamask Wallet,
      // direct user to contribute via that.
      if(this.$store.getters.selectedWallet === 'METAMASK'){
        if(typeof web3 !== 'undefined'){
          web3 = new Web3(web3.currentProvider)
        } else{
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
        }

        var VyralContract = web3.eth.contract(abi);

        var VyralToken = VyralContract.at(VyralContract.contractAddress);

        VyralToken.buyTokens(10, {
          gas: 20000,
          data: '0xec8ac4d80000000000000000000000000x0c1f00e6749b1fda244d4e3b075efd8073e187ca'
        },
          function(error, response){
            if(error){
              alert("Transaction Failed")
            } else{
              this.$store.dispatch("setContributedStatus", true)
            }
        });

        this.$store.dispatch("setContributedStatus", true)

      }
    },

    data () {
      return {
        selectedWallet: this.$store.getters.selectedWallet,
        contractAddress: VyralConfig.contractAddress
      };
    },

    methods: {
      

      contribute() {
        if(! this.isNetworkConnected) return;
      },

      contractAddressCopySuccess(e){
        alert("Copied: "+ e.text);
      },

      contractAddressCopyError(e){
        alert("Error");
      }
    }
  }
</script>