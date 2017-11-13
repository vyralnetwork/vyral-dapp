<template>
<div class="ref-main">
    <div class="logo">
        <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
    </div>

    <wizard-steps current="REFERAL_LINK"></wizard-steps>
    
    <p class="choose-the-wallet">YOUR REFERAL KEY</p>
    
    <p class="txt3">Post your wallet address in the box below to create your Vyral Referral Key</p>
    <a class="learn-txt">Learn how to create your referal key</a>
    
    <div class="input-grp">
        <input type="text" placeholder="Enter your wallet address" v-model="walletAddress"/>
        <button> CREATE </button>
    </div>
    
    <div class="input-grp">
        <input type="text" class="input2" placeholder="Your referal key" v-model="referralLink"/>
        <button 
          v-clipboard:copy="referralLink"
          v-clipboard:success="referralLinkCopySuccess"
          v-clipboard:error="referralLinkCopyError"> COPY </button>
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
  import {VyralConfig} from "../utils/Config"

  export default {
    name: 'ReferralLinkPage',
    data () {
      return {
        walletAddress: ""
      }
    },
    computed: {
      referralLink(){
        if(this.walletAddress.length >  0){
            return VyralConfig.referralBaseUrl + this.walletAddress
        } else{
            return ''
        }
      }
    },

    methods: {
      referralLinkCopySuccess: function(e){
        alert("Copied: "+ e.text);
      },


      referralLinkCopyError: function(e){
        alert("Error");
      }
    }
  }
</script>