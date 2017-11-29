<template>
  <div class="ico-main">
    <div class="container">
      <div class="logo">
        <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
      </div>
      
      <div class="row">
        <div class="col-md-6">
            <div class= "launch-title">
                <div class="line-1"></div>
                <div class="the-vyral-network-la">THE VYRAL NETWORK LAUNCH</div>
                <div class="line-2"></div>
            </div>
            <div class="vyral-smart-contract">
                 Vyral Smart Contracts powered a decentralized advertising 
                 Ecosystem of blockchain incentive programs from fueling viral
                 growth for crypto token sales to tokenizing reward programs for businesses
                <div class="hard-cap">Hard cap  6,000,000 </div>
                <div class="max-mintable-tokens">MAX MINTABLE TOKENS : 21 MILLION</div>
            </div>
            <div class="token-bar"></div>
        </div>
        
        <div class="col-md-6">
            <div class="pull-right">
              <div class="contributions-accept">CONTRIBUTIONS ACCEPTED FROM 1ST DECEMBER</div>

              <countdown-timer :timestamp="launchDateTime"></countdown-timer>

              <div class="share-token-rate">SHARE TOKEN RATE</div>
              <div class="token-rate">1 ETH  = 7000 SHARE</div>
            </div>
        </div>
      </div>
      
      <wizard-steps current="AGREE_TERMS"></wizard-steps>

      <ul class="list-unstyled">
          <li> 
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeTerms"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I confirm that I have read and agree to the Contribution Terms.</span>
              </label>
          </li>
          <li> 
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeToNotUsResident"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I confirm that I am not a citizen or resident of the United States or other unpermitted country.</span>
              </label>
          </li>
          <li> 
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeToNotSendingViaExchange"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I confirm I am not sending from an exchange.</span>
              </label>
          </li>
          <li>
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeToTimeToReceiveToken"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I understand that it may take up to 15 days from the time the contribution period ends to receive SHARE Tokens.</span>
              </label>
          </li>
          <li>
              <label class="checkbox">
                  <input type="checkbox" v-model="agreeToMinimumContribution"/>
                  <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
                  <span class= "check-txt">I confirm that my contribution is at least 1 ETH or higher and no more than 500 ETH.</span>
              </label>
          </li>
          <li> 
            <label class="checkbox">
              <input type="checkbox" v-model="agreeToLossingContributionIfLess"/>
              <span class="check-image"><img src="/static/images/ok-icon.svg"/></span>
              <span class= "check-txt">I understand that I will lose my contribution If it is less than 1 ETH & will not receive a refund.</span>
            </label>
          </li>

      </ul>

      <div class="text-center margin-top-xl">
        <button class="btn btn-primary" @click="allTermsAgreed()" v-bind:disabled="!agreeToAllTermsAndConditions">Continue</button>
      </div>

      <div class="footer-links">
        <a>Terms & Conditions</a>
        <a class="vyral">Vyral Network Whitepaper</a>
      </div>
    </div>
  </div>
</template>

<script>
import VyralConfig from "../utils/Config"

export default {
  name: 'AgreeTermsPage',

  data () {

    return {
      agreeTerms: false,
      agreeToNotUsResident: false,
      agreeToNotSendingViaExchange: false,
      agreeToTimeToReceiveToken: false,
      agreeToMinimumContribution: false,
      agreeToLossingContributionIfLess: false,

      launchDateTime: VyralConfig.launchDateTime
    }
  },

  computed: {
    agreeToAllTermsAndConditions: function(){
      return !!this.agreeTerms 
        && !!this.agreeToNotUsResident
        && !!this.agreeToNotSendingViaExchange
        && !!this.agreeToTimeToReceiveToken
        && !!this.agreeToMinimumContribution
        && !!this.agreeToLossingContributionIfLess
    }
  },

  methods: {
    allTermsAgreed(){
      // Save Agreed Terms state in Store
      this.$store.dispatch("setTermsAgreed", true)

      this.$router.push({
        name: 'SelectWalletPage'
      })
    }
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