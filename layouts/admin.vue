<template>
  <div id="app">
    <div class="admin-wrap">
      <AdminHeader/>
      <AdminAside/>
      <Notify/>
      <div class="admin-routes">
        <transition name="fadeIn">
          <nuxt/>
        </transition>
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
      Notify,
    },

    data() {
      return {
        showModal: false,
        activeModal: null
      }
    },

    mounted() {

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
    left: $asideWidth;
    top: $adminHeader;
    height: calc(100vh - 60px);
    width: calc(100% - 60px);
    overflow: hidden;
  }
</style>
