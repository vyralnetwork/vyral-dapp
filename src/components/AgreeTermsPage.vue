<template>
  <div class="ico-main">
    <div class="logo">
      <img src="/static/images/logo.png" alt="">
    </div>
    
    <div class="content">
      <div class="left-block">
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
      
      <div class="right-block">
          <div class="contributions-accept">CONTRIBUTIONS ACCEPTED FROM 1ST DECEMBER</div>
          <div class="count-day-hr-min-sec">20 : 14 : 54 : 34</div>
          <div class="day-hr-min-sec">
              <span class="days">DAYS</span>
              <span class="hrs">HOURS</span>
              <span class="mins">MIN</span>
              <span class="sec">SEC</span>
          </div>
          <div class="share-token-rate">SHARE TOKEN RATE</div>
          <div class="token-rate">1 ETH  = 100 ST </div>
          <button class="white-btn">SAVE YOUR SPOT</button>
      </div>
    </div>
    
    <div class="contribute-status-bar">
        <div class="status-line"></div>
        <div class="oval">
            <div class="oval-txt">1</div>
        </div>
        <div class="oval oval2">
            <div class="oval-txt">2</div>
        </div>
        <div class="oval oval3">
            <div class="oval-txt">3</div>
        </div>
        <div class="oval oval4">
            <div class="oval-txt">4</div>
        </div>
        <div class="status-bar-txt">
            <span class="confirm">CONFIRM</span>
            <span class="select-wallet">SELECT YOUR WALLET</span>
            <span class="contribute">CONTRIBUTE</span>
            <span class="ref-link">YOUR REFERAL LINK</span>
        </div>
    </div>

    <ul class="checks-block">

        <li> 
            <label class="checkbox">
                <input type="checkbox"/>
                <span class="check-image"><img src="images/ok icon.svg"/></span>
                <span class= "check-txt">I confirm that I have read and agree to the Contribution Terms.</span>
            </label>
        </li>
        <li> 
            <label class="checkbox">
                <input type="checkbox"/>
                <span class="check-image"><img src="images/ok icon.svg"/></span>
                <span class= "check-txt">I confirm that I am not a citizen or resident of the United States or other unpermitted country.</span>
            </label>
        </li>
        <li> 
            <label class="checkbox">
                <input type="checkbox"/>
                <span class="check-image"><img src="images/ok icon.svg"/></span>
                <span class= "check-txt">I confirm I am not sending from an exchange.</span>
            </label>
        </li>
        <li> 
            <label class="checkbox">
                <input type="checkbox"/>
                <span class="check-image"><img src="images/ok icon.svg"/></span>
                <span class= "check-txt">I understand that it may take up to 15 days from the time the contribution period ends to receive SHARE Tokens.</span>
            </label>
        </li>
        <li> 
            <label class="checkbox">
                <input type="checkbox"/>
                <span class="check-image"><img src="images/ok icon.svg"/></span>
                <span class= "check-txt">I confirm that my contribution is at least 1 ETH or higher and no more than 500 ETH.</span>
            </label>
        </li>
        <li> 
            <label class="checkbox">
                <input type="checkbox"/>
                <span class="check-image"><img src="images/ok icon.svg"/></span>
                <span class= "check-txt">I understand that I will lose my contribution If it is less than 1 ETH & will not receive a refund.</span>
            </label>
        </li>

    </ul>


    <router-link :to="{ name: 'SelectWalletPage' }" className="red-btn">Continue</router-link>

    <div class="footer-links">
            <a>Terms & Conditions</a>
            <a class="vyral">Vyral Network Whitepaper</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgreeTermsPage',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
