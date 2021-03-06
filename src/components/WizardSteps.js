import Vue from 'vue'

Vue.component("wizard-steps", {
    props: ['current', 'completed'],

    template: `
    <ul class="progress-tracker">
      <li>
        <router-link :to="{name:'AgreeTermsPage'}" v-show="areTermsAgreed">
            <div class="step complete">
                <i class="fa fa-check white"></i>
            </div>
        </router-link>
        <div class="step" v-show="!areTermsAgreed">1</div>
        <div class="label">CONFIRM</div>
      </li>
      <li>
        <router-link :to="{name:'SelectWalletPage'}" v-show="isWalletSelected">
            <div class="step complete">
                <i class="fa fa-check white"></i>
            </div>
        </router-link>
        <div class="step" v-show="!isWalletSelected">2</div>
        <div class="label">SELECT YOUR WALLET</div>
      </li>
      <li>
        <router-link :to="{name:'ContributePage'}" v-show="userHasContributed">
            <div class="step complete">
                <i class="fa fa-check white"></i>
            </div>
        </router-link>
        <div class="step" v-show="!userHasContributed">3</div>
        <div class="label">PURCHASE</div>
      </li>
      <li>
        <router-link :to="{name:'ReferralLinkPage'}" v-show="referralLinkGenerated">
            <div class="step complete">
                <i class="fa fa-check white"></i>
            </div>
        </router-link>
        <div class="step" v-show="!referralLinkGenerated">4</div>
        <div class="label">YOUR REFERRAL KEY</div>
      </li>
    </ul>
    `,

    computed:{
        areTermsAgreed(){
            return this.current === 'SELECT_WALLET' || this.current === 'CONTRIBUTE' || this.current === 'REFERRAL_LINK'
        },

        isWalletSelected(){
            return this.current === 'CONTRIBUTE' || this.current === 'REFERRAL_LINK'
        },

        userHasContributed(){
            return this.current === 'REFERRAL_LINK'
        },

        referralLinkGenerated(){
            return this.completed
        }
    }
})