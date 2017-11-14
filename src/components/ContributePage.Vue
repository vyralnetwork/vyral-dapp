<template>
  <div class="cont-main">
  <div class="logo">
    <a href="/"><img src="/static/images/logo.png" alt="Vyral Network"></a>
  </div>

  <wizard-steps current="CONTRIBUTE"></wizard-steps>
  
  <div class="choose-the-wallet">VYRAL NETWORK CONTRIBUTION ADDRESS</div>
  
  <p class="txt2"> Do not send ETH from exchanges. We recommending using MetaMask, MyEtherWallet, Mist or other ERC-20 compatible wallets.</p>
  
  <div class="qrcode-container">
    <p>Please send your contribution to the following address or QR code. Recommended Gas amount: 200,00</p>
    <canvas id="qrcode"></canvas>
    <div class="input-grp">
      <input type="text" placeholder="Contract ETH Address" v-model="contractAddress"/>
      <button type="button"
      v-clipboard:copy="contractAddress"
      v-clipboard:success="contractAddressCopySuccess"
      v-clipboard:error="contractAddressCopyError">COPY</button>
    </div>
  </div>


  <div class="text-center" v-show="metamaskSelected()">
      Instruction to contribute via <strong>METAMASK</strong>.
  </div>

  <div class="text-center" v-show="myEtherWalletSelected()">
      Instruction to contribute via <strong>My Ether Wallet</strong>.
  </div>

  <div class="text-center" v-show="paritySelected()">
      Instruction to contribute via <strong>PARITY</strong>.
  </div>

  <div class="text-center" v-show="iMTokenSelected()">
      Instruction to contribute via <strong>I AM TOKEN</strong>.
  </div>

  <div class="text-center" v-show="jaxxSelected()">
      Instruction to contribute via <strong>JAXX</strong>.
  </div>

  <div class="text-center" v-show="mistSelected()">
      Instruction to contribute via <strong>MIST</strong>.
  </div>
  
  <p class="footer-txt">Get your referal Link once you have Complated your transaction</p>
  
  <div class="text-center margin-top-xl margin-bottom-xl">
    <router-link :to="{ name: 'ReferralLinkPage' }" class="transparent-btn">CLAIM MY REFERAL LINK</router-link>
  </div>
  
</div>
</template>

<script>
  import {getWeb3, getNetworkVersion} from '../utils/BlockchainHelpers'
  import {getEncodedABIClientSide} from '../utils/MicroServices'
  import {VyralConfig} from "../utils/Config"
  const QRCode = require('qrcode')

  export default {
    name: 'ContibutePage',
    beforeCreate () {
      console.log('Before Create')
    },

    mounted(){
        if(! this.$store.getters.termsAgreed){
            this.$router.push({name: "AgreeTermsPage"})
        } else if(! this.$store.getters.selectedWallet){
            this.$router.push({name: "SelectWalletPage"})
        }


        // Check if Web3 is installed via Metamask or Mist
        if(this.$store.getters.selectedWallet === 'METAMASK'){
            setTimeout(() => {
              getWeb3((web3) => {
                getNetworkVersion(web3, (networkID) => {
                  console.log(networkID);
                  if (networkID !== VyralConfig.networks.mainnet) {
                    alert("Please switch to Ethereum Mainnet.")
                  } else{
                    console.log('Great, you are on Ethereum Mainnet')
                    this.isNetworkConnected = true;

                    const data = {};

                    // Buy Tokens
                    web3
                        .eth
                        .contract(VyralConfig.abi)
                        .at(VyralConfig.contractAddress)
                        .buyTokens(/* Referral Key */);

                    // getEncodedABIClientSide(web3, VyralConfig.abi, data, function(){
                    //   // alert("here");
                    // });
                  }
                })
              })
            }, 500);
        }
      
      // var canvas = document.getElementById('qrcode')

      // QRCode.toCanvas(canvas, VyralConfig.contractAddress, function (error) {
      //   if (error) console.error(error)
      //   console.log('success!');
      // })
    },

    data () {
      return {
        selectedWallet: this.$store.getters.selectedWallet,
        contractAddress: VyralConfig.contractAddress
      };
    },
    methods: {
      metamaskSelected(){
        return this.selectedWallet === 'METAMASK'
      },


      myEtherWalletSelected(){
        return this.selectedWallet === 'MYETHERWALLET'
      },

      paritySelected(){
        return this.selectedWallet === 'PARITY'
      },

      iMTokenSelected(){
        return this.selectedWallet === 'IAMTOKEN'
      },

      jaxxSelected(){
        return this.selectedWallet === 'JAXX'
      },

      mistSelected(){
        return this.selectedWallet === 'MIST'
      },

      contribute() {
        if(! this.isNetworkConnected) return;
      },

      contractAddressCopySuccess(e){
        alert("Copied: "+ e.text);
      },


      contractAddressCopyError(e){
        alert("Error");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
