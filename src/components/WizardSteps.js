import Vue from 'vue'

Vue.component("wizard-steps", {
    props: ['current'],

    template: `
    <div>
    <div class="contribute-status-bar">
      <div class="status-line"></div>

      <div class="oval-green">
        <img class="oval-ok" src="/static/images/ok icon.svg" v-show="areTermsAgreed"/>
        <div class="oval-txt" v-show="!areTermsAgreed">1</div>
      </div>

      <div class="oval-green oval2">
        <img class="oval-ok" src="/static/images/ok icon.svg" v-show="isWalletSelected"/>
        <div class="oval-txt" v-show="!isWalletSelected">2</div>
      </div>

      <div class="oval oval3">
        <img class="oval-ok" src="/static/images/ok icon.svg" v-show="userHasContributed"/>
        <div class="oval-txt" v-show="!userHasContributed">3</div>
      </div>

      <div class="oval oval4">
        <img class="oval-ok" src="/static/images/ok icon.svg" v-show="referralLinkGenerated"/>
        <div class="oval-txt" v-show="!referralLinkGenerated">4</div>
      </div>

      <div class="status-bar-txt">
        <span class="confirm">CONFIRM</span>
        <span class="select-wallet">SELECT YOUR WALLET</span>
        <span class="contribute">CONTRIBUTE</span>
        <span class="ref-link">YOUR REFERAL LINK</span>
      </div>
    </div>
    
    <ul class="progress-tracker">
      <li class="complete">
        <div class="step">1</div>
        <div class="label">Biography</div>
      </li>
      <li class="complete">
        <div class="step">2</div>
        <div class="label">Superpowers</div>
      </li>
      <li class="active">
        <div class="step">3</div>
        <div class="label">Weapons</label>
      </li>
      <li>
        <div class="step">4</div>
        <div class="label">Photos</div>
      </li>
      <li>
        <div class="step">5</div>
        <div class="label">Reviews</div>
      </li>
    </ul>
    </div>
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