<template>
  <div class="container">
    <app-header/>
    <Notify/>
    <div class="route-wrap">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  import Notify from '@/services/Notifications/Notify'

  export default {
    components: {
      AppHeader,
      Notify
    },

    data() {
      return {}
    },

    computed: {
      ...mapGetters({
        isAuthenticated: 'AuthModule/isAuthenticated'
      })
    }
  }
</script>

<style lang="scss">

</style>
