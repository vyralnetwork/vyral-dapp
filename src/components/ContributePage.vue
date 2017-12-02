<template>
<div class="cont-main">
  <div class="container">
    <div class="logo">
      <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
    </div>

    <wizard-steps current="CONTRIBUTE"></wizard-steps>
    
    <div class="choose-the-wallet" v-show="! checkingTransaction">VYRAL NETWORK CONTRIBUTION ADDRESS</div>
    
    <p class="txt2" v-show="! checkingTransaction">Do not send ETH from exchanges. We recommending using MetaMask, MyEtherWallet, Mist or other ERC-20 compatible wallets.</p>
    
    <div class="row" v-show="! checkingTransaction">
      <div class="col-md-6 col-md-offset-3 contribution-form">

        <form v-show="selectedWallet === 'METAMASK'" >

          <div class="form-group">
            <label>Enter your contribution amount. Minimum <strong>1 ETH</strong>. Can contain decimal. eg. 1.45 ETH</label>
            <input type="number" class="form-control" placeholder="10.0" name="contributionAmount" v-model="contributionAmount" min="1" max="500" step="0.25" v-validate="'required|min_value:1|max_value:500'">
            <span v-show="errors.has('contributionAmount')" class="small text-danger">Minimum contribution is 1 ETH and maximum is 500 ETH</span>
          </div>

          <div class="form-group">
            <label>Referral Vyral Key (optional)</label>
            <input type="text" class="form-control mono" placeholder="0x000000000000000000000000000" name="referrer" v-model="referrer" v-validate="{regex:/^(0x)?[0-9a-f]{40}$/i}" />
            <span v-show="errors.has('referrer')" class="small text-danger">Referrer address is not correct</span>
          </div>

          <button type="button" class="btn btn-primary btn-block" @click="contribute()">Purchase</button>

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

    <p class="footer-txt" v-show="! checkingTransaction">Get your Vyral Key once you have completed your transaction.</p>


    <div class="margin-top-xxl text-center text-muted" v-show="checkingTransaction">
      <i class="fa fa-spinner fa-pulse fa-4x white margin-top-xl margin-bottom-xl"></i>
      <p>Check transaction on <a v-bind:href="config.etherscanLink + hashKey" target="_blank">etherscan.io here</a></p>
    </div>

    <div class="text-center margin-top-xl margin-bottom-xl" v-show="hasContributed">
      <router-link :to="{ name: 'ReferralLinkPage' }" class="btn btn-primary">Claim my Vyral Referral Link</router-link>
    </div>

  </div>

</div>
</template>

<script>
  import {getConfig} from "../utils/config"
  import {getWeb3, getVyralSaleContract} from "../utils/blockChainUtils"

  const config = getConfig()


  export default {
    name: 'ContributePage',

    data () {

      return {
        config: config,
        copyLabel: "Copy",
        textCopied: false,
        contributionAmount: this.$store.getters.contributionValue,
        selectedWallet: this.$store.getters.selectedWallet,
        contractAddress: config.vyralSaleContractAddress,
        referrer: this.$store.getters.referrer,
        hasContributed: this.$store.getters.hasContributed,
        checkingTransaction: false,
        hashKey: ""
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
        this.hasContributed = true
        this.$store.dispatch("setContributedStatus", true)
      }
    },

    methods: {
      contribute() {

        if(this.referrer){
          this.$store.dispatch("setReferrer", this.referrer)
        }

        // If user has selected Metamask Wallet,
        // direct user to contribute via that.
        if(this.selectedWallet === 'METAMASK'){
          web3 = getWeb3()


          if(web3.eth.accounts.length === 0){
            return this.$swal('Oops!', 'Hmmm! Looks like you have not logged into MetaMask yet. Please login and refresh this page.', 'error')
          }

          web3.eth.defaultAccount = web3.eth.accounts[0];

          const VyralSaleContract = getVyralSaleContract(web3)

          const payload = {
            to: config.vyralSaleContractAddress,
            from: web3.eth.defaultAccount,
            value: web3.toWei(this.contributionAmount, 'ether'),
            gas: 200000,
            gasPrice: 50000000000,
          }

          web3.eth.sendTransaction(payload, this.referrer, (error, hashKey) => {
              this.hashKey = hashKey

              if(error){
                this.$store.dispatch("setContributedStatus", false)
                return this.$swal('Oops!', error.message, 'error')
              }


              this.checkingTransaction = true;

              var checkingTransactionStatusTimer = setInterval(() => {
                var receipt = web3.eth.getTransactionReceipt(hashKey, (error, response) => {
                  if(response && response.status){
                    clearInterval(checkingTransactionStatusTimer)
                    this.checkingTransaction = false

                    if(response.status === '0x0'){
                      this.$swal('Oops!', 'Transaction failed. Please try again', 'error')
                    } else if(response.status === '0x1'){
                      this.$store.dispatch("setContributedStatus", true)
                      this.$store.dispatch("setContributionFromAddress", response.from)
                      this.$router.push({
                        name: 'ReferralLinkPage'
                      })
                    }
                  }
                })

              }, 2500)

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