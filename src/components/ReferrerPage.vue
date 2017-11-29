<script>
export default {
  name: 'ReferrerPage',
  render(){

  },
  mounted(){
    var referrer = this.$route.params.referrer;

    if(referrer){
        this.$store.dispatch('setReferrer', referrer)
    }

    this.$router.replace('/')
  },

}
</script>