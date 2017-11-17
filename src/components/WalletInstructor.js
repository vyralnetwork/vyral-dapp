import Vue from 'vue'

Vue.component('wallet-instructor',{

    props: ['selectedWallet'],

    template: `
    <div>
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