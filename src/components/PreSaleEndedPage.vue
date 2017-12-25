<template>
  <div class="ico-main">
    <div class="container">
      <div class="logo text-center">
        <a href="https://vyral.network"><img src="/static/images/logo.png" alt="Vyral Network"></a>
      </div>

      <div class="text-center">
       <div class= "launch-title">
           <div class="the-vyral-network-la margin-bottom-xl">THE VYRAL NETWORK LAUNCH</div>
       </div>
       <div class="lead white row">
          <div class="col-md-6 col-md-offset-3">
            Vyral Smart Contracts powers a decentralized advertising 
            Ecosystem of blockchain incentive programs from fueling viral
            growth for crypto token sales to tokenizing reward programs for businesses

            <h2 class="margin-top-xxl text-primary text-uppercase">Pre-sale has ended</h2>
            <button class="btn btn-primary margin-top-md text-uppercase" @click="showModal = true">Get Notified When We Open Again</button>
            <div v-if="showModal" @close="showModal = false">
              <div class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-container">
                    <div class="modal-body">
                      <form @submit="subscribeUser()" v-show="! subscribed">
                          <div class="form-group">
                            <label>Enter your email address</label>
                            <input type="email" class="form-control" placeholder="Your primary email address" v-model="emailAddress" name="emailAddress" v-validate="'required|email'">
                            <p class="text-danger h6" v-show="errors.has('emailAddress')">Enter valid email address</p>
                          </div>

                          <div class="form-group">
                            <button class="btn btn-primary btn-block" v-bind:disabled="errors.has('emailAddress')">Notify me when contribution is open</button>
                            
                          </div>
                      </form>

                      <div v-show="subscribed">
                        <p class="text-success small">Great! you will be notified when we open again. Meanwhile, please join our Telegram group to stay up-to-date with Vyral.</p>

                        <div class="text-center">
                          <a href="https://t.me/vyralnetwork" class="btn btn-primary"><i class="fa fa-telegram"></i> Join Telegram Group</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getConfig} from "../utils/config"
const axios = require('axios')
const config = getConfig()


export default {
  name: 'PreSaleEndedPage',


  data () {
    return {
      emailAddress: '',
      showModal: false,
      subscribed: false,
      zapierSubscribeUrl: config.zapierSubscribeUrl
    }
  },

  methods: {
    subscribeUser(){
      this.sendWebhookRequest(this.emailAddress).then((response) => {
        console.log(response)
        this.subscribed = true
      })
    },

    sendWebhookRequest(email){
      return axios.get(this.zapierSubscribeUrl +'?email='+ email)
    }
  }
}
</script>