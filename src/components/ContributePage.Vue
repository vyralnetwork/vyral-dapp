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


  <div class="text-center" v-show="metamaskSelected()">
      Instruction to contribute via <strong>METAMASK</strong>.
  </div>

  <div class="text-center" v-show="myEtherWalletSelected()">
      Instruction to contribute via <strong>My Ether Wallet</strong>.
  </div>

  <div class="text-center" v-show="paritySelected()">
      Instruction to contribute via <strong>PARITY</strong>.
  </div>

  <div class="text-center" v-show="iMTokenSelected()">
      Instruction to contribute via <strong>I AM TOKEN</strong>.
  </div>

  <div class="text-center" v-show="jaxxSelected()">
      Instruction to contribute via <strong>JAXX</strong>.
  </div>

  <div class="text-center" v-show="mistSelected()">
      Instruction to contribute via <strong>MIST</strong>.
  </div>
  
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
    beforeCreate () {
      console.log('Before Create')
    },

    mounted(){
      if(! this.$store.getters.termsAgreed){
          this.$router.push({name: "AgreeTermsPage"})
      } else if(! this.$store.getters.selectedWallet){
          this.$router.push({name: "SelectWalletPage"})
      }


      if(this.$store.getters.selectedWallet === 'METAMASK'){
        if(typeof web3 !== 'undefined'){
          web3 = new Web3(web3.currentProvider)
        } else{
          web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
        }

        var VyralContract = web3.eth.contract(abi);

        var VyralToken = VyralContract.at("0x0c1f00e6749b1fda244d4e3b075efd8073e187ca");

        VyralToken.buyTokens(10, {
          gas: 20000,
          data: '0xec8ac4d80000000000000000000000000x0c1f00e6749b1fda244d4e3b075efd8073e187ca'
        },
          function(error, response){
          console.log(arguments);
        });
      }
    },

    data () {
      return {
        selectedWallet: this.$store.getters.selectedWallet,
        contractAddress: VyralConfig.contractAddress
      };
    },

    methods: {
      metamaskSelected(){
        return this.selectedWallet === 'METAMASK'
      },

      myEtherWalletSelected(){
        return this.selectedWallet === 'MYETHERWALLET'
      },

      paritySelected(){
        return this.selectedWallet === 'PARITY'
      },

      iMTokenSelected(){
        return this.selectedWallet === 'IAMTOKEN'
      },

      jaxxSelected(){
        return this.selectedWallet === 'JAXX'
      },

      mistSelected(){
        return this.selectedWallet === 'MIST'
      },

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