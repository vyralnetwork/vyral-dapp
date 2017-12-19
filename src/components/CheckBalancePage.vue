<template>
    <div class="ref-main">
        <div class="container">
            <div class="logo">
                <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
            </div>

            <div class="row" v-show="!referralLink">
                <div class="col-md-12 margin-top-lg">
                    <p class="hero white text-center">Enter your wallet address in the box below to create your Vyral Referral Key:</p>

                    <div class="form-group with-error-message">
                        <input type="text" class="form-control mono" placeholder="Enter your wallet address you contributed from" v-model="walletAddress" @keyup="validateWalletAddress()">
                    </div>
                    <p class="small text-danger" v-bind:style="{visibility: walletAddressError ? 'visible': 'hidden'}">{{ walletAddressError }}</p>
                    <!-- wallet address -->

                    <button class="btn btn-block btn-primary"
                        v-bind:disabled="!walletAddress || walletAddressError.length > 0"
                        @click="generateReferralKey()">
                            Generate Referral Link
                    </button>
                </div>
            </div>



            <div class="input-group" v-show="referralLink">
                <input type="text" class="form-control mono" placeholder="Your Vyral Referral Link" v-model="referralLink" readonly="readonly" @focus="$event.target.select()">
                <span class="input-group-btn">
                    <button 
                    class="btn btn-primary" 
                    v-bind:class="{'success': textCopied}"
                    v-clipboard:copy="referralLink"
                    v-clipboard:success="referralLinkCopySuccess"
                    v-clipboard:error="referralLinkCopyError">{{ copyLabel }}</button>
                </span>
            </div>

            <ul class="list-unstyled list-inline margin-top-xl row text-center" v-show="referralLink">
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
const axios = require('axios')

const config = getConfig()

var abi = require("../contracts/Share.json")

export default {
    name: 'CheckBalancePage',

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
            telegramId: "",
            telegramIdError: "",
            emailAddress: "",
            emailAddressError: "",
            etherscanTokenLink: config.etherscanTokenLink,
            referralLink: "",
            zapierWebhookUrl: config.zapierWebhookUrl
        }
    },

    mounted(){
        // if(! this.$store.getters.termsAgreed){
        //     this.$router.push({name: "AgreeTermsPage"})
        // } else if(! this.$store.getters.selectedWallet){
        //     this.$router.push({name: "SelectWalletPage"})
        // } else if (! this.$store.getters.hasContributed){
        //     this.$router.push({name: "ContributePage"})
        // }


        if(this.referralLink){
            this.getBalance()
        }
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
            } else if(! /(0x)?[0-9a-f]{40}$/i.test(walletAddress) ){
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
                this.walletAddressError = 'This is the contract address. Please enter the address you contributed from.'
            } else if(this.walletAddress === this.shareContractAddress){
                this.walletAddressError = 'This is the SHARE address. Please enter the address you contributed from.'
            } else if(this.walletAddress === this.multisigAddress){
                this.walletAddressError = 'This is the multisig address. Please enter the address you contributed from.'
            } else if(! /(0x)?[0-9a-f]{40}$/i.test(this.walletAddress) ){
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
        },

        generateReferralKey(){
            if(this.walletAddress && this.walletAddress.length >  0 && this.isWalletAddressValid()){
                this.referralLink = this.referralBaseUrl + this.walletAddress
                this.getBalance()
            } else{
                this.referralLink = ''
            }
        },


    }
}
</script>


<style scoped>
.input-group{
    margin-bottom: 30px;
}

.text-danger{
    margin-top: -15px;
    margin-bottom: 30px
}

.input-group-btn button{
    width: 120px;
}

</style>