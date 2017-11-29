<template>
<div class="cont-main">
  <div class="container">
    <div class="logo">
      <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
    </div>

    <wizard-steps current="CONTRIBUTE"></wizard-steps>
    
    <div class="choose-the-wallet">VYRAL NETWORK CONTRIBUTION ADDRESS</div>
    
    <p class="txt2">Do not send ETH from exchanges. We recommending using MetaMask, MyEtherWallet, Mist or other ERC-20 compatible wallets.</p>
    
    <div class="row">
      <div class="col-md-6 col-md-offset-3 contribution-form">

        <form v-show="selectedWallet === 'METAMASK'" >

          <div class="form-group">
            <label>Enter the amount like to contribute. Minimum contribution should be 1 ETH</label>
            <input type="number" class="form-control" placeholder="10.0" v-model="contributionAmount" min="1" step="0.25">
          </div>

          <div class="form-group">
            <label>Referral Vyral Key</label>
            <input type="text" class="form-control mono" placeholder="0x000000000000000000000000000" v-model="referralKey"/>
          </div>

          <button type="button" class="btn btn-primary btn-block" @click="contribute()">Contribute</button>

        </form>


        <div v-show="selectedWallet !== 'METAMASK'">
            <p>Please send your contribution to the following address. Recommended Gas amount: 200,00</p>
            <div class="input-group">
              <input type="text" class="form-control mono" placeholder="Contract ETH Address" v-model="contractAddress">
              <span class="input-group-btn">
                <button 
                  class="btn btn-primary" 
                  type="button"
                  v-bind:class="{'success': textCopied}"
                  v-clipboard:copy="contractAddress"
                  v-clipboard:success="contractAddressCopySuccess"
                  v-clipboard:error="contractAddressCopyError">{{ copyLabel }}</button>
              </span>
            </div><!-- /input-group -->
          </form>

          <wallet-instructor :selectedWallet="selectedWallet"></wallet-instructor>
        </div>

      </div>
    </div>

    <p class="footer-txt">Get your Vyral Key once you have completed your transaction.</p>

    <div class="text-center margin-top-xl margin-bottom-xl">
      <router-link :to="{ name: 'ReferralLinkPage' }" class="transparent-btn">CLAIM MY VYRAL LINK</router-link>
    </div>

  </div>

</div>
</template>

<script>
  import VyralConfig from "../utils/Config"
  var abi = require("../contracts/VyralSale.json")

  export default {
    name: 'ContributePage',

    data () {
      return {
        copyLabel: "Copy",
        textCopied: false,
        contributionAmount: this.$store.getters.contributionValue,
        selectedWallet: this.$store.getters.selectedWallet,
        contractAddress: VyralConfig.contractAddress,
        referralKey: ""
      }
    },

    created(){
      if(! this.$store.getters.termsAgreed){
          this.$router.push({name: "AgreeTermsPage"})
      } else if(! this.$store.getters.selectedWallet){
          this.$router.push({name: "SelectWalletPage"})
      }

      // If it's not Metamask, we have no way to know if we should enable Referral Link or not.
      if(this.selectedWallet !== 'METAMASK'){
        this.$store.dispatch("setContributedStatus", true)
      }
    },

    methods: {
      contribute() {
        const store = this.$store
        const swal = this.$swal

        if(this.referralKey){
          this.$store.dispatch("setReferrer", this.referralKey)
        }

        // If user has selected Metamask Wallet,
        // direct user to contribute via that.
        if(this.selectedWallet === 'METAMASK'){
          if(typeof web3 !== 'undefined'){
            web3 = new Web3(web3.currentProvider)
          } else{
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
          }

          if(web3.eth.accounts.length === 0){
            return this.$swal('Oops!', 'Hmmm! Looks like you have not logged into MetaMask yet. Please login and refresh this page.', 'error')
          }

          web3.eth.defaultAccount = web3.eth.accounts[0];

          var VyralContractAby = web3.eth.contract(abi);

          var VyralContract = VyralContractAby.at("0x8Ed05562dAc1631E9BFc82Ebc81321448C41BAb0");

          VyralContract
            .buyTokens("0x8e62a66a8edc1478795b637e4722af1337057c0f",
            {
              from: web3.eth.defaultAccount,
              value: web3.toWei(this.contributionAmount, 'ether'),
            },
            function(error, response){
              console.log(arguments)
              if(error){
                swal('Oops!', error.message, 'error')
                store.dispatch("setContributedStatus", false)
              } else{
                web3.eth.getTransaction(response, function(error, response){
                  console.log(arguments)
                  store.dispatch("setContributedStatus", true)
                  store.dispatch("setContributionFromAddress", response.from)
                })
              }
          });

        }
      },

      contractAddressCopySuccess(e){
        this.copyLabel = "✔ Copied";
        this.textCopied = true;

        setTimeout(() => {
          this.copyLabel = "Copy"
          this.textCopied = false
        }, 3000)
      },

      contractAddressCopyError(e){
        this.$swal("Oops", "Unable to copy the address. Please copy it manually.", "error")
      }
    }
  }
</script>



<style scoped>
  .contribution-form{
    background-color: #fff;
    padding: 20px;
  }

  label{
    font-weight: normal;
    font-size: 12px;
  }
</style>