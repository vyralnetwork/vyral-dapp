import Vue from 'vue'

Vue.component('Modal', {
    template: `
        <transition name="modal">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container">
                  <div class="modal-body">
                    <slot name="body">
                      default body
                    </slot>
                  </div>
                </div>
              </div>
            </div>
        </transition>
    `
})