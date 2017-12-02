
import Vue from 'vue'

Vue.component("countdown-timer", {
  props: ['timestamp'],
  template: `
    <ul class="countdown-timer">
      <li>
        <div class="count-day-hr-min-sec">{{ days }}</div>
        <div class="day-hr-min-sec">
            <span class="days">DAY</span>
        </div>
      </li>
      <li class="separator">:</li>
      <li>
        <div class="count-day-hr-min-sec">{{ hours }}</div>
        <div class="day-hr-min-sec">
            <span class="hrs">HOUR</span>
        </div>
      </li>
      <li class="separator">:</li>
      <li>
        <div class="count-day-hr-min-sec">{{ minutes }}</div>
        <div class="day-hr-min-sec">
            <span class="mins">MIN</span>
        </div>
      </li>
      <li class="separator">:</li>
      <li>
        <div class="count-day-hr-min-sec">{{ seconds }}</div>
        <div class="day-hr-min-sec">
            <span class="sec">SEC</span>
        </div>
      </li>
    </ul>
  `,

  mounted() {
    setInterval(() => {
      this.now = new Date().getTime();

      if(this.timeStampDiff < 0){
        this.$emit('timerStopped')
      }
    }, 1000);
  },

  data() {
    return {
      now: new Date().getTime(),
    }
  },

  computed: {
    timeStampDiff() {
      return Math.trunc((this.timestamp - this.now) / 1000);
    },

    seconds(){
      return this.timeStampDiff % 60;
    },

    minutes() {
      return Math.trunc(this.timeStampDiff / 60) % 60;
    },

    hours() {
      return Math.trunc(this.timeStampDiff / 60 / 60) % 24;
    },

    days() {
      return Math.trunc(this.timeStampDiff / 60 / 60 / 24);
    }
  }
});