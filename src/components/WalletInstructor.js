import Vue from 'vue'

Vue.component('wallet-instructor',{

    props: ['selectedWallet'],

    template: `
    <div class='wallet-instructor'>
        <div class="text-center" v-show="metamaskSelected()">
          <a href="https://blog.vyral.network/how-to-purchase-share-tokens-via-metamask-3bc29df4efbc" target="_blank">Click here for instructions to purchase via <strong>METAMASK</strong></a>
        </div>

        <div class="text-center" v-show="myEtherWalletSelected()">
          <a href="https://blog.vyral.network/how-to-contribute-via-myetherwallet-78f6c14418ca" target="_blank">Click here for instructions to purchase via <strong>MyEtherWallet</strong></a>
        </div>

        <div class="text-center" v-show="paritySelected()">
          <a href="https://blog.vyral.network/guides/home" target="_blank">Click here for instructions to purchase via <strong>PARITY</strong></a>
        </div>

        <div class="text-center" v-show="iMTokenSelected()">
          <a href="https://blog.vyral.network/guides/home" target="_blank">Click here for instructions to purchase via <strong>I AM TOKEN</strong></a>
        </div>

        <div class="text-center" v-show="jaxxSelected()">
          <a href="https://blog.vyral.network/guides/home" target="_blank">Click here for instructions to purchase via <strong>JAXX</strong></a>
        </div>

        <div class="text-center" v-show="mistSelected()">
          <a href="https://blog.vyral.network/guides/home" target="_blank">Click here for instructions to purchase via <strong>MIST</strong></a>
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
          return this.selectedWallet === 'IMTOKEN'
        },

        jaxxSelected(){
          return this.selectedWallet === 'JAXX'
        },

        mistSelected(){
          return this.selectedWallet === 'MIST'
        },
    }

})