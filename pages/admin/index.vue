<template>
  <div class="admin-main-page" v-if="isAdmin">
    <h1>Main Admin Page</h1>
  </div>
</template>

<script>
  export default {
    layout: 'admin',
    components: {},

    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (!vm.$store.state.AuthModule.isAuthenticated) {
          next({ path: '/auth' })
        } else {
          next()
        }
      })
    },

    methods: {},

    computed: {
      ...mapState({
        isAdmin: state => state.AuthModule.isAdmin
      })
    }
  }
</script>