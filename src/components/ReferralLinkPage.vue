<template>
<div class="ref-main">
  <div class="container">
    <div class="logo">
        <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
    </div>

    <wizard-steps current="REFERAL_LINK"></wizard-steps>
    
    <p class="choose-the-wallet">YOUR REFERAL KEY</p>
    

    <div class="row">
      <div class="col-md-6 col-md-offset-3 margin-top-lg">
        <p class="txt3" v-show="!walletAddress">Post your wallet address in the box below to create your Vyral Referral Key</p>
        <a href="#" class="learn-txt">Learn how to create your referal key</a>


        <div class="input-group" v-show="!walletAddress">
          <input type="text" class="form-control" placeholder="Contract ETH AddresEnter your wallet addresss" v-model="walletAddress">
          <span class="input-group-btn">
            <button class="btn btn-primary">Create</button>
          </span>
        </div><!-- /input-group -->


        <div class="input-group">
          <input type="text" class="form-control" placeholder="Your Vyral Referral Code" v-model="referralLink">
          <span class="input-group-btn">
            <button 
              class="btn btn-primary" 
              type="button"
              v-bind:class="{'success': textCopied}"
              v-clipboard:copy="referralLink"
              v-clipboard:success="referralLinkCopySuccess"
              v-clipboard:error="referralLinkCopyError">{{ copyLabel }}</button>
          </span>
        </div><!-- /input-group -->
      </div>
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
</div>
</template>


<script>
  import VyralConfig from "../utils/Config"

  export default {
    name: 'ReferralLinkPage',

    data () {
      return {
        copyLabel: 'Copy',
        textCopied: false,
        walletAddress: this.$store.getters.contributionFromAddress,
      }
    },

    mounted(){
        if(! this.$store.getters.termsAgreed){
            this.$router.push({name: "AgreeTermsPage"})
        } else if(! this.$store.getters.selectedWallet){
            this.$router.push({name: "SelectWalletPage"})
        } else if (! this.$store.getters.hasContributed){
            this.$router.push({name: "ContributePage"})
        }

    },

    computed: {
      referralLink(){
        if(this.walletAddress.length >  0){
            return this.walletAddress
        } else{
            return ''
        }
      }
    },

    methods: {
      referralLinkCopySuccess: function(e){
        this.copyLabel = "✔ Copied";
        this.textCopied = true;

        setTimeout(() => {
          this.copyLabel = "Copy"
          this.textCopied = false
        }, 3000)
      },


      referralLinkCopyError: function(e){
        alert("Error");
      }
    }
  }
</script>


<style scoped>
  .learn-txt{
    margin-bottom: 50px;
  }

  .input-group{
    margin-bottom: 30px;
  }

  .input-group-btn button{
    width: 120px;
  }

</style>