<template>
<div class="ref-main">
    <div class="logo">
        <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
    </div>

    <wizard-steps current="REFERAL_LINK"></wizard-steps>
    
    <p class="choose-the-wallet">YOUR REFERAL KEY</p>
    
    <p class="txt3" v-show="!walletAddress">Post your wallet address in the box below to create your Vyral Referral Key</p>
    <a href="#" class="learn-txt">Learn how to create your referal key</a>
    
    <div class="input-grp" v-show="!walletAddress">
        <input type="text" placeholder="Enter your wallet address" v-model="walletAddress"/>
        <button> CREATE </button>
    </div>
    
    <div class="input-grp">
        <input type="text" class="input2" placeholder="Your referral key" v-model="referralLink"/>
        <button type="button"
          v-bind:class="{'success': textCopied}"
          v-clipboard:copy="referralLink"
          v-clipboard:success="referralLinkCopySuccess"
          v-clipboard:error="referralLinkCopyError">
            {{ copyLabel }}
          </button>
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
  import VyralConfig from "../utils/Config"

  export default {
    name: 'ReferralLinkPage',

    mounted(){
        if(! this.$store.getters.termsAgreed){
            this.$router.push({name: "AgreeTermsPage"})
        } else if(! this.$store.getters.selectedWallet){
            this.$router.push({name: "SelectWalletPage"})
        } else if (! this.$store.getters.hasContributed){
            this.$router.push({name: "ContributePage"})
        }

    },

    data () {
      return {
        copyLabel: 'COPY',
        textCopied: false,
        walletAddress: this.$store.getters.contributionFromAddress,
      }
    },
    computed: {
      referralLink(){
        if(this.walletAddress.length >  0){
            return VyralConfig.referralCodePrefix + this.walletAddress
        } else{
            return ''
        }
      }
    },

    methods: {
      referralLinkCopySuccess: function(e){
        this.copyLabel = "✔ COPIED";
        this.textCopied = true;

        setTimeout(() => {
          this.copyLabel = "COPY"
          this.textCopied = false
        }, 3000)
      },


      referralLinkCopyError: function(e){
        alert("Error");
      }
    }
  }
</script>