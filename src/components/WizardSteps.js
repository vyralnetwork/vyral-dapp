import Vue from 'vue'

Vue.component("wizard-steps", {
    props: ['current'],

    template: `
    <ul class="progress-tracker">
      <li>
        <router-link :to="{name:'AgreeTermsPage'}" v-show="areTermsAgreed">
            <div class="step complete">
                <img class="oval-ok" src="/static/images/ok-icon.svg"/>
            </div>
        </router-link>
        <div class="step" v-show="!areTermsAgreed">1</div>
        <div class="label">CONFIRM</div>
      </li>
      <li>
        <router-link :to="{name:'SelectWalletPage'}" v-show="isWalletSelected">
            <div class="step complete">
                <img class="oval-ok" src="/static/images/ok-icon.svg"/>
            </div>
        </router-link>
        <div class="step" v-show="!isWalletSelected">2</div>
        <div class="label">SELECT YOUR WALLET</div>
      </li>
      <li>
        <router-link :to="{name:'ContributePage'}" v-show="userHasContributed">
            <div class="step complete">
                <img class="oval-ok" src="/static/images/ok-icon.svg"/>
            </div>
        </router-link>
        <div class="step" v-show="!userHasContributed">3</div>
        <div class="label">CONTRIBUTE</div>
      </li>
      <li>
        <router-link :to="{name:'ReferralLinkPage'}" v-show="referralLinkGenerated">
            <div class="step complete">
                <img class="oval-ok" src="/static/images/ok-icon.svg"/>
            </div>
        </router-link>
        <div class="step" v-show="!referralLinkGenerated">4</div>
        <div class="label">YOUR REFERAL LINK</div>
      </li>
    </ul>
    `,

    computed:{
        areTermsAgreed(){
            return this.current === 'SELECT_WALLET' || this.current === 'CONTRIBUTE' || this.current === 'REFERAL_LINK'
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