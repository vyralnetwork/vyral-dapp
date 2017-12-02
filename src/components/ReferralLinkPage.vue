<template>
    <div class="ref-main">
        <div class="container">
            <div class="logo">
                <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
            </div>

            <wizard-steps current="REFERAL_LINK"></wizard-steps>

            <p class="choose-the-wallet margin-top-xl">YOUR REFERAL LINK</p>


            <div class="row">
                <div class="col-md-12 margin-top-lg">
                    <p class="txt3" v-show="!walletAddress">Post your wallet address in the box below to create your Vyral Referral Key:</p>
                    <!-- <a href="#" class="learn-txt">Learn how to create your referal key</a> -->


                    <div class="input-group" v-show="!walletAddress">
                        <input type="text" class="form-control mono" placeholder="Contract ETH AddresEnter your wallet addresss" v-model="walletAddress">
                        <span class="input-group-btn">
                            <button class="btn btn-primary">Create</button>
                        </span>
                    </div><!-- /input-group -->


                    <div class="input-group">
                        <input type="text" class="form-control mono" placeholder="Your Vyral Referral Code" v-model="referralLink">
                        <span class="input-group-btn">
                            <button 
                            class="btn btn-primary" 
                            v-bind:class="{'success': textCopied}"
                            v-clipboard:copy="referralLink"
                            v-clipboard:success="referralLinkCopySuccess"
                            v-clipboard:error="referralLinkCopyError">{{ copyLabel }}</button>
                        </span>
                    </div><!-- /input-group -->
                </div>
            </div>


            <div class="text-center" v-show="referralLink">
                <h3 class="text-center hero" style="color: white;">Earn more SHARE tokens by sharing your referal key</h3>
                <ul class="list-unstyled list-inline social-share">
                    <li>
                        <a class="btn btn-inverse facebook" target="_blank" v-bind:href="'https://www.facebook.com/sharer/sharer.php?u=https%3A//contribute.vyral.network/referrer/' + referralLink ">
                            <i class="fa fa-facebook"></i>
                        </a>
                    </li>

                    <li>
                        <a class="btn btn-inverse twitter" target="_blank" v-bind:href="'https://twitter.com/home?status=https%3A//contribute.vyral.network/referrer/' + referralLink ">
                            <i class="fa fa-twitter"></i>
                        </a>
                    </li>

                    <li>
                        <a class="btn btn-inverse linkedin" target="_blank" v-bind:href="'https://www.linkedin.com/shareArticle?mini=true&url=https%3A//contribute.vyral.network/referrer/' + referralLink ">
                            <i class="fa fa-linkedin"></i>
                        </a>
                    </li>

                    <li>
                        <a class="btn btn-inverse gplus" target="_blank" v-bind:href="'https://plus.google.com/share?url=https%3A//contribute.vyral.network/referrer/' + referralLink ">
                            <i class="fa fa-google-plus"></i>
                        </a>
                    </li>
                </ul>
            </div>


            <ul class="list-unstyled list-inline margin-top-xl row text-center">
                <li class="col-md-4 col-md-offset-2">
                    <div class="balance-title">Your SHARE Balance</div>
                    <div class="balance-num" v-show="! loadingVyralBalance">{{ vyralBalance - vyralLockedBalance }}</div>
                    <div class="text-center" v-show="loadingVyralBalance">
                        <i class="fa fa-2x fa-spinner"></i>
                    </div>
                </li>
                <li class="col-md-4">
                    <div class="balance-title">Your SHARE Bonus</div>
                    <div class="balance-num" v-show="! loadingVyralLockedBalance">{{ vyralLockedBalance }}</div>
                    <div class="text-center" v-show="loadingVyralLockedBalance">
                        <i class="fa fa-2x fa-spinner"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import VyralConfig from "../config/dev.js"
import {getWeb3, getShareContract} from "../utils/blockChainUtils"

var abi = require("../contracts/Share.json")

export default {
    name: 'ReferralLinkPage',

    data () {
        return {
            copyLabel: 'Copy',
            textCopied: false,
            walletAddress: this.$store.getters.contributionFromAddress,
            contractAddress: VyralConfig.vyralSaleContractAddress,
            referralBaseUrl: VyralConfig.referralBaseUrl,
            vyralBalance: 0,
            vyralLockedBalance: 0,
            loadingVyralBalance: true,
            loadingVyralLockedBalance: true,
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


        if(this.referralLink){
            this.getBalance()
        }

    },

    computed: {
        referralLink(){
            if(this.walletAddress.length >  0){
                return this.referralBaseUrl + this.walletAddress
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

        getBalance(){
            this.loadingVyralBalance = true
            this.loadingVyralLockedBalance = true

            var web3 = getWeb3()
            var ShareContract = getShareContract(web3)

            ShareContract.balanceOf(this.walletAddress, (error, response) => {
                this.loadingVyralBalance = false
                this.vyralBalance = web3.fromWei(response, "ether" ).toNumber()
            })

            ShareContract.lockedBalanceOf(this.walletAddress, (error, response) => {
                this.loadingVyralLockedBalance = false
                this.vyralLockedBalance = web3.fromWei(response, "ether" ).toNumber()
            })
        },

        referralLinkCopyError: function(e){
            alert("Error");
        }


    }
}
</script>


<style scoped>
.input-group{
    margin-bottom: 30px;
}

.input-group-btn button{
    width: 120px;
}

</style>