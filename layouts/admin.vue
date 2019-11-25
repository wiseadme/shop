<template>
  <div id="app">
    <div class="page-wrap">
      <AdminHeader v-if="isAdmin"/>
      <AdminAside v-if="isAdmin"/>
      <Notify/>
      <div class="admin-routes">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminHeader from '@/components/AdminLayout/AdminHeader'
  import AdminAside from '@/components/AdminLayout/AdminAside'
  import Notify from '@/services/Notifications/Notify'

  export default {
    components: {
      AdminHeader,
      AdminAside,
      Notify
    },

    data() {
      return {}
    },

    computed: {
      ...mapState({
        isAdmin: state => state.AuthModule.isAdmin
      })
    }
  }
</script>

<style lang="scss">
  .admin-routes {
    position: absolute;
    left: $adminAside;
    top: $adminHeader;
    height: calc(100vh - 60px);
    width: calc(100% - 200px);
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
