<template>
    <div class='home-page'>
        <div>
            Sign in with {{ loginWay }}
        </div>
        <q-btn color="primary" @click="goTo('/')" class="go-back-btn">Back</q-btn>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loginPath: this.$route.params.loginPath,
      loginWay: ''
    }
  },
  mounted () {
    this.getLoginWay()
  },
  methods: {
    getLoginWay () {
      this.loginWay = this.loginPath.replace('/loginWith', '')
    },
    goTo (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="stylus">
.home-page
    text-align center
    margin 20%
    font-size 20px
    .go-back-btn
        margin 2vh
</style>
