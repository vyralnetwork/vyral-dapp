<template>
  <div class="ico-main">
    <div class="container">
      <div class="logo">
        <a href="https://vyral.network"><img src="/static/images/logo.png" alt="Vyral Network"></a>
      </div>

      <div class="row">
        <div class="col-md-6">
            <div class= "launch-title">
                <div class="line-1"></div>
                <div class="the-vyral-network-la">THE VYRAL NETWORK LAUNCH</div>
                <div class="line-2"></div>
            </div>
            <div class="vyral-smart-contract">
                 Vyral Smart Contracts powers a decentralized advertising 
                 Ecosystem of blockchain incentive programs from fueling viral
                 growth for crypto token sales to tokenizing reward programs for businesses
                <div class="hard-cap">Pre-sale Hard Cap {{ sold }} / 10,000 ETH</div>
            </div>
            <div class="contribution-progress-indicator progress margin-top-md">
              <div class="progress-bar progress-bar-striped progress-bar-animated active" v-bind:style="{width: percentContributed + '%'}"></div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="pull-right">
              <div class="contributions-accept">CURRENT PRE-SALE BONUS ENDS IN</div>

              <countdown-timer :timestamp="launchDateTime" @timerStopped="resetTimer"></countdown-timer>

              <div class="share-token-rate">SHARE TOKEN RATE</div>
              <div class="token-rate">1 ETH  = 7000 SHARE + BONUS</div>
            </div>
        </div>
      </div>

      <wizard-steps current="AGREE_TERMS"></wizard-steps>

      <ul class="list-unstyled">
          <li>
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeTerms" @click="attemptedToContinue = false"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I confirm that I have read and agree to the Purchase Terms.</span>
              </label>
          </li>
          <li> 
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeToNotUsResident" @click="attemptedToContinue = false"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I confirm that I am not a citizen or resident of the US, UK, Canada, China, South Korea, North Korea, Seychelles or OFAC Sanctioned Countries.</span>
              </label>
          </li>
          <li> 
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeToNotSendingViaExchange" @click="attemptedToContinue = false"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I confirm I am not sending from an exchange otherwise this will cause a loss of my entire purchase with no right to refund.</span>
              </label>
          </li>
          <li>
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeToTimeToReceiveToken" @click="attemptedToContinue = false"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I understand that the public sale date has not been announced and it may take up to 7 days from the conclusion of the public sale to receive SHARE Tokens.</span>
              </label>
          </li>
          <li>
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeToMinimumContribution" @click="attemptedToContinue = false"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I confirm that my purchase is at least 1 ETH or higher and no more than 500 ETH.</span>
              </label>
          </li>
      </ul>

      <div class="text-center margin-top-xl">
        <p class="text-danger text-center" v-show="!agreeToAllTermsAndConditions && attemptedToContinue">You must agree to all terms in order to continue</p>

        <button class="btn btn-primary text-uppercase" @click="allTermsAgreed()" v-bind:class="{disabled: !agreeToAllTermsAndConditions}">
          Continue
        </button>
      </div>


      <ul class="list-unstyled list-inline text-center margin-top-xxl footer-links">
        <li><a href="https://vyral.network/terms-and-conditions/Vyral-Terms-and-Conditions.pdf" class="text-muted" target="_blank">Terms & Conditions</a></li>
        <li><a href="https://vyral.network/paper" class="text-muted" target="_blank">Whitepaper</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getConfig} from "../utils/config"
import {getWeb3, getVyralSaleContract} from '../utils/blockChainUtils'
import {getEndTime} from '../utils/vyralSchedule'
const config = getConfig()
const endTime = getEndTime()

const soldBottomCap =  546
const totalSupply = 10000


export default {
  name: 'AgreeTermsPage',

  mounted(){
    // when user is on this page, lets reset everything
    // as user is starting from scratch. EXCEPT REFERRER
    // this.$store.dispatch('resetProgress')


    // this.getTotalSupply()
    this.getSoldPresale()
    // this.getSoldSale()
  },


  data () {
    return {
      config: config,
      agreeTerms: false,
      agreeToNotUsResident: false,
      agreeToNotSendingViaExchange: false,
      agreeToTimeToReceiveToken: false,
      agreeToMinimumContribution: false,

      launchDateTime: endTime,

      totalSupply: totalSupply,
      sold : 546,

      attemptedToContinue: false,
    }
  },

  computed: {
    agreeToAllTermsAndConditions: function(){
      return !!this.agreeTerms 
        && !!this.agreeToNotUsResident
        && !!this.agreeToNotSendingViaExchange
        && !!this.agreeToTimeToReceiveToken
        && !!this.agreeToMinimumContribution
    },

    percentContributed(){
      return Math.ceil((this.sold / this.totalSupply) * 100)
    }
  },

  methods: {
    resetTimer(){
      this.launchDateTime = getEndTime()
    },

    allTermsAgreed(){
      this.attemptedToContinue = true

      if(this.agreeToAllTermsAndConditions){
        // Save Agreed Terms state in Store
        this.$store.dispatch("setTermsAgreed", true)

        this.$router.push({
          name: 'SelectWalletPage'
        })
      }
    },


    getTotalSupply(){
      let web3 = getWeb3()

      web3.eth.defaultAccount = web3.eth.accounts[0];

      let VyralSaleContract = getVyralSaleContract(web3)

      VyralSaleContract.TOTAL_SUPPLY.call((error, response) => {
        this.totalSupply = web3.fromWei(response, "ether" ).toNumber()
      })
    },


    getSoldPresale(){
      const BigNumber = require("bignumber.js");
      const Web3 = require('web3');
      const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/A3Yn1ptLQtN3eaUqHoYN'));
      const VyralSaleAbi = require("../contracts/VyralSale.json");

      let VyralSale = web3.eth.contract(VyralSaleAbi);
      let vyralSale = VyralSale.at("0x708352CD28ea06e6bbD5C1a9408b4966Ac1226e4");
      let soldPresale = vyralSale.soldPresale();
      let tokens = new BigNumber(soldPresale).div(new BigNumber(10).pow(18));


      this.sold = soldBottomCap + parseInt(tokens.toNumber())

      // let web3 = getWeb3()

      // let VyralSaleContract = getVyralSaleContract(web3)

      // var sold = VyralSaleContract.soldPresale.call((error, response) => {
      //   console.log(web3.fromWei(response, "ether" ).toNumber())
      //   this.sold = soldBottomCap + web3.fromWei(response, "ether" ).toNumber();
      // })


      // console.log(sold)

    },


    getSoldSale(){
      let web3 = getWeb3()

      let VyralSaleContract = getVyralSaleContract(web3)

      VyralSaleContract.soldSale.call((error, response) => {
        console.log(response)
      });
    },
  }
}
</script>



<style scoped>
.checkbox{
  margin: 0 auto;
}

.checkbox input {
    display: none;
}

.check-image {
    height: 19px;
    width: 19px;
    border: 1px solid #979797;
    border-radius: 2px;
    display: inline-block;
    position:relative
}
.check-image img{
    display:none;
}
.checkbox input:checked + span {
    height: 19px;
    width: 19px;
    border:none;
    border-radius: 2px;
    background-color: #ED385E;
}
.checkbox input:checked + .check-image img{
    display: block;
    position:relative;
    top: 6px;
    left: 4px;
}
.checks-block{
    width: 73%;
    margin: auto;
    min-width: 760px;
    margin-top: 55px
}
.check-txt{
    position: relative;
    top: -6px;
    left: 17px;
    color: #FFFFFF;
    font-size: 11.2px;
    line-height: 23px;
    font-weight: normal;
}
</style>