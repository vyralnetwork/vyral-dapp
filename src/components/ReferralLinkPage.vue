<template>
    <div class="ref-main">
        <div class="container">
            <div class="logo">
                <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
            </div>

            <wizard-steps current="REFERRAL_LINK"></wizard-steps>

            <p class="choose-the-wallet margin-top-xl">YOUR REFERRAL LINK</p>


            <div class="row">
                <div class="col-md-12 margin-top-lg">
                    <p class="hero white text-center">Post your wallet address in the box below to create your Vyral Referral Key:</p>

                    <div class="input-group with-error-message">
                        <input type="text" class="form-control mono" placeholder="Enter your wallet address you contributed from" v-model="walletAddress" @keyup="validateWalletAddress()">
                        <span class="input-group-btn">
                            <button class="btn btn-primary">Create</button>
                        </span>
                    </div><!-- /input-group -->
                    <p class="small text-danger" v-show="walletAddressError">{{ walletAddressError }}</p>

                    <div class="input-group">
                        <input type="text" class="form-control mono" placeholder="Your Vyral Referral Link" v-model="referralLink" readonly="readonly" @focus="$event.target.select()">
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
                <h3 class="text-center hero" style="color: white;">Earn more SHARE tokens by sharing your referral key</h3>
                <ul class="list-unstyled list-inline social-share">
                    <li>
                        <a class="btn btn-inverse facebook white" target="_blank" v-bind:href="'https://www.facebook.com/sharer/sharer.php?u=' + referralLink ">
                            <i class="fa fa-facebook"></i>
                        </a>
                    </li>

                    <li>
                        <a class="btn btn-inverse twitter white" target="_blank" v-bind:href="'https://twitter.com/home?status=' + referralLink ">
                            <i class="fa fa-twitter"></i>
                        </a>
                    </li>

                    <li>
                        <a class="btn btn-inverse linkedin white" target="_blank" v-bind:href="'https://www.linkedin.com/shareArticle?mini=true&url=' + referralLink ">
                            <i class="fa fa-linkedin"></i>
                        </a>
                    </li>

                    <li>
                        <a class="btn btn-inverse gplus white" target="_blank" v-bind:href="'https://plus.google.com/share?url=' + referralLink ">
                            <i class="fa fa-google-plus"></i>
                        </a>
                    </li>
                </ul>
            </div>


            <ul class="list-unstyled list-inline margin-top-xl row text-center" v-show="walletAddress">
                <li class="col-md-4 col-md-offset-2">
                    <div class="balance-title margin-bottom-xl">
                        <a target="_blank" v-bind:href="etherscanTokenLink + shareContractAddress + '?a=' + walletAddress">Your SHARE Balance</a>
                    </div>
                    <div class="balance-num" v-show="! loadingVyralBalance"><a target="_blank" v-bind:href="etherscanTokenLink + shareContractAddress + '?a=' + walletAddress">{{ vyralBalance - vyralLockedBalance }}</a></div>
                    <div class="text-center" v-show="loadingVyralBalance">
                        <i class="fa fa-2x fa-spinner white fa-pulse"></i>
                    </div>
                </li>
                <li class="col-md-4">
                    <div class="balance-title margin-bottom-xl">
                        <a target="_blank" v-bind:href="etherscanTokenLink + shareContractAddress + '?a=' + walletAddress">Your SHARE Bonus</a>
                    </div>
                    <div class="balance-num" v-show="! loadingVyralLockedBalance"><a target="_blank" v-bind:href="etherscanTokenLink + shareContractAddress + '?a=' + walletAddress">{{ vyralLockedBalance }}</a></div>
                    <div class="text-center" v-show="loadingVyralLockedBalance">
                        <i class="fa fa-2x fa-spinner white fa-pulse"></i>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>


<script>
import {getConfig} from "../utils/config"
import {getWeb3, getShareContract} from "../utils/blockChainUtils"

const config = getConfig()

var abi = require("../contracts/Share.json")

export default {
    name: 'ReferralLinkPage',

    data () {
        return {
            copyLabel: 'Copy',
            textCopied: false,
            walletAddress: this.$store.getters.contributionFromAddress,
            multisigAddress: config.multisigAddress,
            vyralSaleContractAddress:config.vyralSaleContractAddress,
            shareContractAddress: config.shareContractAddress,
            referralBaseUrl: config.referralBaseUrl,
            vyralBalance: 0,
            vyralLockedBalance: 0,
            loadingVyralBalance: true,
            loadingVyralLockedBalance: true,
            walletAddressError: "",
            etherscanTokenLink: config.etherscanTokenLink
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


        if(this.walletAddress){
            this.getBalance()
        }
    },

    computed: {
        referralLink(){
            if(this.walletAddress && this.walletAddress.length >  0 && this.isWalletAddressValid()){
                return this.referralBaseUrl + this.walletAddress
            } else{
                return ''
            }
        },
    },

    methods: {
        isWalletAddressValid(){
            let walletAddress = this.walletAddress
                                    .replace("https://etherscan.io/address/", "")
                                    .replace("https://contribute.vyral.network/#/referrer/", "")

            if(walletAddress === this.contractAddress){
                return false
            } else if(walletAddress === this.multisigAddress){
                return false
            } else if(! /(0x)?[0-9a-f]{40}$/.test(walletAddress) ){
                return false
            } else{
                return true
            }
        },

        validateWalletAddress(){
            this.walletAddress = this.walletAddress
                                    .replace("https://etherscan.io/address/", "")
                                    .replace("https://contribute.vyral.network/#/referrer/", "")

            if(this.walletAddress === this.contractAddress){
                this.walletAddressError = 'This is the contract address. Please enter the address your contributed from.'
            } else if(this.walletAddress === this.multisigAddress){
                this.walletAddressError = 'This is the multisig address. Please enter the address your contributed from.'
            } else if(! /(0x)?[0-9a-f]{40}$/.test(this.walletAddress) ){
                this.walletAddressError = 'Please enter correct wallet address'
            } else{
                this.walletAddressError = ""
                this.getBalance()
            }

        },
        referralLinkCopySuccess: function(e){
            this.copyLabel = "Copied";
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

.text-danger{
    margin-top: -30px;
    margin-bottom: 30px
}

.input-group-btn button{
    width: 120px;
}

</style>