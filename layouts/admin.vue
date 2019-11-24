<template>
  <div class="admin">
    <AdminHeader/>
    <Notify/>
    <div class="route-wrap">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import AdminHeader from '@/components/AdminLayout/AdminHeader'
  import Notify from '@/services/Notifications/Notify'

  export default {
    components: {
      AdminHeader,
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
