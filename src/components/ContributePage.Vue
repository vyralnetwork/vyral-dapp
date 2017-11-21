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

    <div v-show="selectedWallet === 'METAMASK'">
      <label>How much would you like to contribute</label>
      <input type="number" placeholder="Amount to conribute in ETH" v-model="contributionAmount" min="1" step="0.25"/>

      <button @click="contribute()">Contribute</button>
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
  import VyralConfig from "../utils/Config"
  var abi = require("../contracts/VyralSale.json")

  export default {
    name: 'ContributePage',

    created(){
      if(! this.$store.getters.termsAgreed){
          this.$router.push({name: "AgreeTermsPage"})
      } else if(! this.$store.getters.selectedWallet){
          this.$router.push({name: "SelectWalletPage"})
      }
    },

    data () {
      return {
        contributionAmount: this.$store.getters.contributionValue,
        selectedWallet: this.$store.getters.selectedWallet,
        contractAddress: VyralConfig.contractAddress
      };
    },

    methods: {
      

      contribute() {
        // If user has selected Metamask Wallet,
        // direct user to contribute via that.
        if(this.selectedWallet === 'METAMASK'){
          if(typeof web3 !== 'undefined'){
            web3 = new Web3(web3.currentProvider)
          } else{
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
          }

          if(web3.eth.accounts.length === 0){
            alert("Hmmm! Looks like you have not logged into MetaMask yet. Please login and refresh this page.")
            return;
          }

          web3.eth.defaultAccount = web.eth.accounts[0];

          var VyralContractAby = web3.eth.contract(abi);

          var VyralContract = VyralContractAby.at("0x8Ed05562dAc1631E9BFc82Ebc81321448C41BAb0");

          // var data = VyralContract.buyTokens.getData({
          //   _referrer: "0x8e62a66a8edc1478795b637e4722af1337057c0f"
          // });

          VyralContract.buyTokens.sendTransaction("0x8e62a66a8edc1478795b637e4722af1337057c0f", {
            to: "0x47e23d1adf242d0b651312305b10ed198249fc0a",
            from: web3.eth.defaultAccount,
            value: web3.toWei(this.contributionAmount, 'ether'),
            //data: data
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

      contractAddressCopySuccess(e){
        alert("Copied: "+ e.text);
      },

      contractAddressCopyError(e){
        alert("Error");
      }
    }
  }
</script>