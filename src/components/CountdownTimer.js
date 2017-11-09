import Vue from 'vue'
import moment from 'moment'

Vue.component("countdown-timer", {
  props: ['timestamp'],
  template: `
    <ul class="countdown-timer">
      <li>
        <div class="count-day-hr-min-sec">{{days}}</div>
        <div class="day-hr-min-sec">
            <span class="days">DAYS</span>
        </div>
      </li>
      <li class="separator">:</li>
      <li>
        <div class="count-day-hr-min-sec">{{ hours }}</div>
        <div class="day-hr-min-sec">
            <span class="hrs">HOURS</span>
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
      console.log("reset time")
      this.now = new Date().getTime();
    },1000);
  },

  data() {
    return {
      now: new Date().getTime(),
      date: new Date(this.timestamp)
    }
  },

  computed: {
    days(){
      return moment(new Date(1512122400000)).diff(this.now, "days")
    },
    hours(){
      return moment(new Date(1512122400000)).diff(this.now, "hours") % 24;
    },
    minutes(){
      return (moment(new Date(1512122400000)).diff(this.now, "minutes") % 24) % 60;
    },
    seconds(){
      console.log("Changing secs")
      return ((moment(new Date(1512122400000)).diff(this.now, "seconds") % 24) % 60) % 60;
    }

    // seconds() {
    //   return (this.date - this.now) % 60;
    // },

    // minutes() {
    //   return ((this.date - this.now) / 60) % 60;
    // },

    // hours() {
    //   return ((this.date - this.now) / 60 / 60) % 24;
    // },

    // days() {
    //   return ((this.date - this.now) / 60 / 60 / 24);
    // }
  }
});