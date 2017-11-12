import Vue from 'vue'

Vue.component("wizard-steps", {
    props: ['current'],

    template: `
    <ul class="progress-tracker">
  <li>
    <div v-show="areTermsAgreed" class="step complete"><img class="oval-ok" src="/static/images/ok icon.svg"/></div>
    <div class="step" v-show="!areTermsAgreed">1</div>
    <div class="label">CONFIRM</div>
  </li>
  <li>
    <div v-show="isWalletSelected" class="step complete"><img class="oval-ok" src="/static/images/ok icon.svg"/></div>
    <div class="step" v-show="!isWalletSelected">2</div>
    <div class="label">SELECT YOUR WALLET</div>
  </li>
  <li>
    <div v-show="userHasContributed" class="step complete"><img class="oval-ok" src="/static/images/ok icon.svg"/></div>
    <div class="step" v-show="!userHasContributed">3</div>
    <div class="label">CONTRIBUTE</label>
  </li>
  <li>
    <div v-show="referralLinkGenerated" class="step complete"><img class="oval-ok" src="/static/images/ok icon.svg"/></div>
    <div class="step" v-show="!referralLinkGenerated">4</div>
    <div class="label">YOUR REFERAL LINK</div>
  </li>
</ul>
    `,

    computed:{
        areTermsAgreed(){
            return this.current === 'WALLET_SELECTED' || this.current === 'CONTRIBUTE' || this.current === 'REFERAL_LINK'
        },

        isWalletSelected(){
            return this.current === 'CONTRIBUTE' || this.current === 'REFERAL_LINK'
        },

        userHasContributed(){
            return this.current === 'REFERAL_LINK'
        },

        referralLinkGenerated(){
            return false
        }
    }
})