<template>
  <div class="in-wr">
    <h1>hello mello</h1>
  </div>
</template>

<script>

  export default {
    layout: 'admin',
    components: {},
    middleware: ['auth-control'],
    methods: {
      ...mapActions({
        setUser: `AuthModule/${action.SET_USER}`
      })
    },
    computed: {
      ...mapGetters({
        getToken: 'AuthModule/getToken'
      })
    },
  }
</script>



