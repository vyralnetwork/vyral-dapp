import Vue from 'vue'

Vue.component('wallet-instructor',{

    props: ['selectedWallet'],

    template: `
    <div class='wallet-instructor'>
        <div class="text-center" v-show="metamaskSelected()">
          <a href="#" target="_blank">Click here for instructions to contribute via <strong>METAMASK</strong></a>
        </div>

        <div class="text-center" v-show="myEtherWalletSelected()">
          <a href="#" target="_blank">Click here for instructions to contribute via <strong>My Ether Wallet</strong></a>
        </div>

        <div class="text-center" v-show="paritySelected()">
          <a href="#" target="_blank">Click here for instructions to contribute via <strong>PARITY</strong></a>
        </div>

        <div class="text-center" v-show="iMTokenSelected()">
          <a href="#" target="_blank">Click here for instructions to contribute via <strong>I AM TOKEN</strong></a>
        </div>

        <div class="text-center" v-show="jaxxSelected()">
          <a href="#" target="_blank">Click here for instructions to contribute via <strong>JAXX</strong></a>
        </div>

        <div class="text-center" v-show="mistSelected()">
          <a href="#" target="_blank">Click here for instructions to contribute via <strong>MIST</strong></a>
        </div>
    </div>
    `,

    methods:{
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
    }

})