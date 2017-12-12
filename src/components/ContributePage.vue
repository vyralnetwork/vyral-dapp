<template>
<div class="cont-main">
  <div class="container">
    <div class="logo">
      <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
    </div>

    <wizard-steps current="CONTRIBUTE"></wizard-steps>
    
    <div class="choose-the-wallet" v-show="! checkingTransaction">VYRAL NETWORK CONTRIBUTION ADDRESS</div>
    
    <p class="small white margin-top-xl margin-bottom-xl col-md-6 col-md-offset-3" v-show="! checkingTransaction">
      Please ensure you are using an ERC-20 compatible wallet and you are not sending from an exchange. Sending from an exchange will cause you to not receive any tokens and lose your entire purchase.
    </p>
    
    <div class="row" v-show="! checkingTransaction">
      <div class="col-md-8 col-md-offset-2 contribution-form">

        <div v-show="selectedWallet === 'METAMASK'">
          <div class="form-group">
            <label>Enter your contribution amount. Minimum <strong>1 ETH</strong>. Can contain decimal. eg. 1.45 ETH</label>
            <input type="number" class="form-control" placeholder="10.0" name="contributionAmount" v-model="contributionAmount" min="1" max="500" step="0.25" v-validate="'required|min_value:1|max_value:500'">
            <span v-show="errors.has('contributionAmount')" class="small text-danger">Minimum contribution is 1 ETH and maximum is 500 ETH</span>
            <p class="hero text-muted">Standard Purchased Token Allocation: <strong>{{ standardAllocation }}</strong></p>
            <p class="hero text-muted">Guaranteed Bonus Tokens: <strong>{{ bonusAllocation }}</strong> if you purchase in <strong>{{ humanTimeToGo }}</strong></p>
          </div>

          <div class="form-group">
            <label @click="showReferralKeyField = !showReferralKeyField" class="pointer-cursor">Have Vyral Referral Key?</label>
            <input type="text" v-show="showReferralKeyField" class="form-control mono" placeholder="0x000000000000000000000000000" name="referrer" v-model="referrer" v-validate="{regex:/^(https:\/\/contribute\.vyral\.network\/#\/referrer\/)?(0x)?[0-9a-f]{40}$/i}" @blur="linkToKey()" autocomplete="off" />
            <span v-show="errors.has('referrer') && showReferralKeyField" class="small text-danger">Referrer address is not correct</span>

            <p class="small text-muted" v-show="showReferralKeyField">If you don't have a Referral Vyral Key it won't impact on your purchase</p>
          </div>

          <button type="button" class="btn btn-primary btn-block" @click="contribute()" v-bind:disabled="errors.has('contributionAmount') || errors.has('referrer')">Purchase</button>

        </div>


        <div v-show="selectedWallet !== 'METAMASK'">
          <p class="small">Please send your contribution to the following address. Recommended Gas Limit: 1000000 Gas Price: {{ recommendedGasPrice/1000000000 }} Gwei</p>
          <div class="input-group">
            <input type="text" class="form-control mono" placeholder="Contract ETH Address" v-model="contractAddress" readonly="readonly" @focus="$event.target.select()">
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


          <div class="form-group margin-top-md">
            <label @click="showTokenCalculator = !showTokenCalculator" class="pointer-cursor">Token Calculator</label>
            <div v-show="showTokenCalculator">
              <label>Enter your contribution amount. Minimum <strong>1 ETH</strong>. Can contain decimal. eg. 1.45 ETH</label>
              <div class="row">
                <div class="col-md-3">
                  <input type="number" class="form-control" placeholder="10.0" name="contributionAmount" v-model="contributionAmount" min="1" max="500" step="0.25" v-validate="'required|min_value:1|max_value:500'">
                  <span v-show="errors.has('contributionAmount')" class="small text-danger">Minimum contribution is 1 ETH and maximum is 500 ETH</span>
                </div>
              </div>

              <p class="hero text-muted">Standard Purchased Token Allocation: <strong>{{ standardAllocation }}</strong></p>
              <p class="hero text-muted">Guaranteed Bonus Tokens: <strong>{{ bonusAllocation }}</strong> if you purchase in <strong>{{ humanTimeToGo }}</strong></p>
            </div>
          </div>


          <div class="text-center margin-top-xl" v-show="selectedWallet === 'MYETHERWALLET'">
            <a class="btn btn-primary" v-bind:href="mewLink" target="_blank">Click here to purchase via MyEtherWallet</a>
          </div>

          <wallet-instructor :selectedWallet="selectedWallet"></wallet-instructor>
        </div>

      </div>
    </div>

    <div class="margin-top-xxl text-center text-muted" v-show="checkingTransaction">
      <i class="fa fa-spinner fa-pulse fa-4x white margin-top-xl margin-bottom-xl"></i>
      <p>Transaction Pending. Check transaction progress on <a v-bind:href="config.etherscanTransactionLink + hashKey" target="_blank">etherscan.io here</a></p>
    </div>


    <div v-show="selectedWallet === 'METAMASK'">
      <p class="footer-txt" v-show="!checkingTransaction">Get your Vyral Key once you have completed your transaction.</p>

      <div class="text-center margin-top-xl margin-bottom-xl" v-show="hasContributed">
        <router-link :to="{ name: 'ReferralLinkPage' }" class="btn btn-primary">Claim my Vyral Referral Link</router-link>
      </div>
    </div>


    <div v-show="selectedWallet !== 'METAMASK'">
      <div class="text-center margin-top-xl margin-bottom-xl" v-show="hasContributed">
        <router-link :to="{ name: 'ReferralLinkPage' }" class="btn btn-link white" style="text-decoration: underline;">Get your Vyral Key once you have completed your transaction.</router-link>
      </div>
    </div>

  </div>

</div>
</template>

<script>
  import {getConfig} from "../utils/config"
  import {getWeb3, getVyralSaleContract} from "../utils/blockChainUtils"
  import {getBonusForToday, getBonusByDay} from '../utils/vyralBonusCalculator'
  import {getEndTime, getTimeToGo} from '../utils/vyralSchedule'

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
        hashKey: "",
        showReferralKeyField: false,
        showTokenCalculator: false,
        endTime: getEndTime(),
        humanTimeToGo: '',
        friendlyTimeToGoTimer: '',
        recommendedGasPrice: config.recommendedGasPrice
      }
    },

    created(){
      if(! this.$store.getters.termsAgreed){
        this.$router.push({name: "AgreeTermsPage"})
      } else if(! this.$store.getters.selectedWallet){
        this.$router.push({name: "SelectWalletPage"})
      }

      // If it's not MetaMask, we have no way to know if we should enable Referral Link or not.
      if(this.selectedWallet !== 'METAMASK'){
        this.hasContributed = true
        this.$store.dispatch("setContributedStatus", true)
      } else{
        this.hasContributed = false
      }

      this.getRecommendedGasPrice()

    },

    beforeDestroy(){
      clearInterval(this.friendlyTimeToGoTimer)
    },

    mounted(){
      this.friendlyTimeToGoTimer = setInterval(this.friendlyTimeToGo, 1000)
    },

    computed:{
      mewLink(){
        return `https://www.myetherwallet.com/?to=${this.contractAddress}&gaslimit=1000000&data=${this.referralCode}&value=${this.contributionAmount}#send-transaction`
      },

      referralCode(){
        if(this.referrer.length > 0){
          return config.referralKeyPrefix + this.referrer.replace("0x", "")
        } else{
          return null
        }
      },

      standardAllocation(){
        if(this.contributionAmount){
          return parseInt(this.contributionAmount * config.standardAllocationRate)
        } else{
          return 0
        }
      },

      bonusAllocation(){
        if(this.contributionAmount){
          return parseInt(this.standardAllocation * getBonusByDay(this.endTime) / 100) // is. on day one we give 70% extra of std allocation
        }else{
          return 0
        }
      },
    },

    methods: {
      friendlyTimeToGo(){
        this.endTime =  getEndTime()
        let timeToGo = getTimeToGo(this.endTime)
        let str = []

        if(timeToGo.days){
          this.humanTimeToGo = `${timeToGo.days} days ${timeToGo.hours} hours ${timeToGo.minutes} minutes ${timeToGo.seconds} seconds`
        } else if(timeToGo.hours){
          this.humanTimeToGo = `${timeToGo.hours} hours ${timeToGo.minutes} minutes ${timeToGo.seconds} seconds`
        } else if(timeToGo.minutes){
          this.humanTimeToGo = `${timeToGo.minutes} minutes ${timeToGo.seconds} seconds`
        } else {
          this.humanTimeToGo = `${timeToGo.seconds} seconds`
        }
      },
      toggleReferralKeyField(){
        this.showReferralKeyField = !this.showReferralKeyField
      },

      linkToKey(){
        this.referrer = this.referrer.split("/").pop()
      },

      getRecommendedGasPrice(){
        web3.eth.getGasPrice((error, response) => {
          this.recommendedGasPrice = parseInt(response.toString(), 10) + 5000000000
        })
      },

      contribute() {

        if(this.referrer){
          this.$store.dispatch("setReferrer", this.referrer)
        }

        // If user has selected MetaMask Wallet,
        // direct user to contribute via that.
        if(this.selectedWallet === 'METAMASK'){
          let web3 = getWeb3()


          if(web3.eth.accounts.length === 0){
            return this.$swal('Oops!', 'Hmmm! Looks like you have not logged into MetaMask yet. Please login and refresh this page.', 'error')
          }

          web3.eth.defaultAccount = web3.eth.accounts[0];

          const VyralSaleContract = getVyralSaleContract(web3)

          const payload = {
            to: config.vyralSaleContractAddress,
            from: web3.eth.defaultAccount,
            value: web3.toWei(this.contributionAmount, 'ether'),
            gas: 1000000,
            gasPrice: this.recommendedGasPrice,
          }

          if(this.referrer){
            VyralSaleContract.buyPresale(this.referrer, payload, this.transactionCallback);
          } else {
            web3.eth.sendTransaction(payload, this.transactionCallback)
            // VyralSaleContract.buyPresale(payload, this.transactionCallback);
          }


        }
      },

      transactionCallback(error, hashKey){
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
      },

      contractAddressCopySuccess(e){
        this.copyLabel = "Copied";
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

  .pointer-cursor{
    cursor: pointer;
    text-decoration: none;
  }

  .pointer-cursor:hover{
    text-decoration: underline;
  }
</style>