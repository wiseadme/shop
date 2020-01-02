export default {
  data() {
    return {
      mixRouteTo: '',
      mixCheckBeforeLeave: false,
      mixIsDiffs: true
    }
  },

  beforeRouteLeave(to, from, next) {
    this.routeTo = to
    if (this.mixIsDiffs) {
      this.mixCheckBeforeLeave = true
    } else {
      next()
    }
  },

  watch: {
    mixIsDiffs(to) {
      if (!to) {
        this.$router.push(this.routeTo)
      }
    }
  }
}
