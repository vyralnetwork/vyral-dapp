<template>
  <div class="ico-main">
    <div class="container">
      <div class="logo" v-bind:class="{'text-center': isMobile || isTablet}">
        <a href="https://vyral.network"><img src="/static/images/logo.png" alt="Vyral Network"></a>
      </div>

      <div class="row">
        <div class="col-md-6" v-show="!isMobile && !isTablet">
            <div class= "launch-title">
                <div class="line-1"></div>
                <div class="the-vyral-network-la">THE VYRAL NETWORK LAUNCH</div>
                <div class="line-2"></div>
            </div>
            <div class="vyral-smart-contract">
                 Vyral Smart Contracts powers a decentralized advertising 
                 Ecosystem of blockchain incentive programs from fueling viral
                 growth for crypto token sales to tokenizing reward programs for businesses
                <div class="hard-cap">Pre-sale Hard Cap {{ sold }} / {{ totalSupply }} ETH</div>
            </div>
            <div style="width: 70%">
            <div class="contribution-progress-indicator progress margin-top-md">
              <div class="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated active" v-bind:style="{width: percentContributed + '%'}"></div>
            </div>
            </div>
        </div>

        <div v-bind:class="{'col-md-6': !isMobile && !isTablet}">
            <div v-bind:class="{ 'pull-right': !isMobile && !isTablet, 'text-center': isMobile || isTablet }">
              <div class="white xs">CURRENT PRE-SALE BONUS ENDS IN</div>

              <countdown-timer :timestamp="launchDateTime" @timerStopped="resetTimer"></countdown-timer>

              <div class="white xs margin-top-md">SHARE TOKEN RATE</div>
              <div class="token-rate">1 ETH  = 7000 SHARE + BONUS</div>

              <div class="white xs margin-top-md text-uppercase">Bonus SHARE token offer dropping every day</div>

              <div class="progress-bar-labels" style="margin-top: 20px; top: -10px;">
                <!-- <span class="white xs max">2<sup>nd</sup> DEC</span> -->
                <!-- <span class="white xs" style="left: 29%">3<sup>rd</sup> DEC</span> -->
                <span class="white xs" v-bind:style="{paddingLeft: 100- scaledBonusPercentage + '%'}"></span>
                <!-- <span class="white xs" style="left: 63%">22<sup>nd</sup> DEC</span> -->
                <span class="white xs min">24<sup>th</sup> DEC</span>
              </div>

              <div class="contribution-progress-indicator progress margin-top-md" style="margin-top: 30px;">
                <div class="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated active" v-bind:style="{width: scaledBonusPercentage + '%', float: 'right'}"></div>
              </div>
              <div class="progress-bar-labels">
                <!-- <span class="white xs max">70%<br>START</span> -->
                <!-- <span class="white xs" style="left: 29%">50%</span> -->
                <span class="xs text-primary blinker" v-bind:style="{left: 100- scaledBonusPercentage + '%'}">{{ todaysBonusPercent }}% <br>NOW</span>
                <!-- <span class="white xs" style="left: 50%">35%<br>13<sup>th</sup>DEC</span> -->
                <!-- <span class="white xs" style="left: 57%">30%<br>18<sup>th</sup>DEC</span> -->
                <!-- <span class="white xs" style="left: 63%">26%</span> -->
                <!-- <span class="white xs" style="left: 71%">20%<br>23<sup>rd</sup>DEC</span> -->
                <span class="white xs min">0%<br>END</span>
              </div>
            </div>
        </div>
      </div>

      <wizard-steps current="AGREE_TERMS" v-show="!isMobile && !isTablet"></wizard-steps>

      <ul class="list-unstyled" v-show="!isMobile && !isTablet">
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

      <div class="text-center margin-top-xl" v-show="!isMobile && !isTablet">
        <p class="text-danger text-center" v-show="!agreeToAllTermsAndConditions && attemptedToContinue">You must agree to all terms in order to continue</p>

        <button class="btn btn-primary text-uppercase" @click="allTermsAgreed()" v-bind:class="{disabled: !agreeToAllTermsAndConditions}">
          Continue
        </button>
      </div>



      <!-- Mobile & Table only version -->
      <div class="text-center margin-top-xxl white" v-show="isMobile || isTablet">
        <h3><a v-bind:href="'mailto:?Subject=Vyral%20Contribution%20Address&Body='+ emailBody " class="btn btn-primary">Please use Desktop Browser to contribute</a></h3>
      </div>


      <ul class="list-unstyled list-inline text-center margin-top-xxl footer-links">
        <li><a href="/#/balance" class="text-muted" target="_blank">Check SHARE Balance</a></li>
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
import {getBonusForToday, getBonusByDay} from '../utils/vyralBonusCalculator'

const config = getConfig()
const endTime = getEndTime()

const soldBottomCap =  546
const totalSupply = 5000
const mobileDetector = new MobileDetect(window.navigator.userAgent)


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
      isMobile: mobileDetector.phone(),
      isTablet: mobileDetector.tablet(),
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

      todaysBonusPercent: getBonusForToday(),

      emailBody: `
        Hi, Please follow this link <a href="https://contribute.vyral.network">https://contribute.vyral.network</a> to contribute from your Desktop or Laptop.
      `
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

    scaledBonusPercentage(){
      return this.calculateScaledBonus()
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

    calculateScaledBonus(){
      return parseInt(this.todaysBonusPercent * 10 / 7)
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

.progress-bar-labels{
  margin-top: -15px;
  position: relative;
}

.progress-bar-labels span{
  position: absolute;
}

.progress-bar-labels span.max{
  left: 0;
}

.progress-bar-labels span.min{
  right: 0;
}

.blinker{
  -webkit-animation-name: blinker;
  -webkit-animation-duration: 0.8s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;

  -moz-animation-name: blinker;
  -moz-animation-duration: 0.8s;
  -moz-animation-timing-function: linear;
  -moz-animation-iteration-count: infinite;

  animation-name: blinker;
  animation-duration: 0.8s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>