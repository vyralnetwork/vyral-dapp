<template>
<div class="ref-main">
    <div class="logo">
        <img src="images/logo.png" alt="">
    </div>
    <div class="contribute-status-bar">
        <div class="status-line"></div>
        <div class="oval-green">
            <img class="oval-ok" src="images/ok icon.svg"/>
        </div>
        <div class="oval-green oval2">
            <img class="oval-ok" src="images/ok icon.svg"/>
        </div>
        <div class="oval-green oval3">
            <img class="oval-ok" src="images/ok icon.svg"/>
        </div>
        <div class="oval-green oval4">
            <div class="oval-txt">4</div>
        </div>
        <div class="status-bar-txt">
            <span class="confirm">CONFIRM</span>
            <span class="select-wallet">SELECT YOUR WALLET</span>
            <span class="contribute">CONTRIBUTE</span>
            <span class="ref-link">YOUR REFERAL LINK</span>
        </div>
    </div>
    
    <p class="choose-the-wallet">YOUR REFERAL KEY</p>
    
    <p class="txt3">Post your wallet address in the box below to create your Vyral Referral Key</p>
    <a class="learn-txt">Learn how to create your referal key</a>
    
    <div class="input-grp">
        <input type="text" placeholder="Enter your wallet address"/>
        <button > CREATE </button>
    </div>
    
    <div class="input-grp">
        <input type="text" class="input2" placeholder="Your referal key"/>
        <button > COPY </button>
    </div>
    
    <div class="footer">
        <span>
            <div class="balance-title">Your VYRAL Balance</div>
            <div class="balance-num">125</div>
        </span>
        
        <span class="mleft">
            <div class="balance-title">Your VYRAL Bonus</div>
            <div class="balance-num">525</div>
        </span>
    </div>
    
</div>
</template>


<script>
  export default {
    name: 'ReferralLinkPage',
    data () {
      return {

      }
    },
    methods: {
      
    }
  }
</script>