import Vue from 'vue'

Vue.component('wallet-selector', {

    props: ['selectedWallet'],

    template: `
        <ul class="wallet-container list-unstyled">
          <li class="wallet-type">
            <label class="checkbox">
              <input type="radio" name="selectedWallet" @click="setWallet('MYETHERWALLET')" value="MYETHERWALLET"/>
              <img src="/static/images/myetherwallet-logo.png" class="ether"/>
              <span class="label">MyEtherWallet</span>
              <span class="active" v-if="wallet == 'MYETHERWALLET'"></span>
            </label>
          </li>


          <li class="wallet-type">
            <span class="recommended">Recommended</span>

            <label class="checkbox">
              <input type="radio" name="selectedWallet" @click="setWallet('METAMASK')" value="METAMASK"/>
              <img src="/static/images/metamask.png" class="ether"/>
              <span class="label">MetaMask</span>
              <span class="active" v-if="wallet == 'METAMASK'"></span>
            </label>
          </li>


          <li class="wallet-type">
            <label class="checkbox">
              <input type="radio" name="selectedWallet" @click="setWallet('PARITY')" value="PARITY"/>
              <img src="/static/images/parity.png" class="parity">
              <span class="label">Parity</span>
              <span class="active" v-if="wallet == 'PARITY'"></span>
            </label>
          </li>


          <li class="wallet-type">
            <label class="checkbox">
              <input type="radio" name="selectedWallet" @click="setWallet('IAMTOKEN')" value="IAMTOKEN"/>
              <img src="/static/images/i-am-token.png" class="ether">
              <span class="label">Iam Token</span>
              <span class="active" v-if="wallet == 'IAMTOKEN'"></span>
            </label>
          </li>


          <li class="wallet-type">
            <label class="checkbox">
              <input type="radio" name="selectedWallet" @click="setWallet('JAXX')" value="JAXX"/>
              <img src="/static/images/jaxx.png" class="jaxx">
              <span class="label">Jaxx</span>
              <span class="active" v-if="wallet == 'JAXX'"></span>
            </label>
          </li>


          <li class="wallet-type">
            <label class="checkbox">
              <input type="radio" name="selectedWallet" @click="setWallet('MIST')" value="MIST"/>
              <img src="/static/images/mist.png" class="mist">
              <span class="label">Mist</span>
              <span class="active" v-if="wallet == 'MIST'"></span>
            </label>
          </li>
        </ul>
    `,

    computed:{
        wallet(){
            return this.selectedWallet
        }
    },


    methods: {
        setWallet(wallet){
            this.$emit('walletSelected', wallet)
        }
    }
})