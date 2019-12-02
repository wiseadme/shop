<template>
  <div id="app">
    <div class="page-wrap">
      <AdminHeader v-if="isAdmin"/>
      <AdminAside v-if="isAdmin"/>
      <Notify/>
      <transition name="fadeIn">
        <v-modal-render v-if="showModal" :activeModal="activeModal"/>
      </transition>
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
  import VModalRender from '@/components/ui/VModalRender'
  import CategoryModals from '../components/mixins/Modals/category.js'
  import { modalEvents } from '../services/Modal'

  export default {
    components: {
      AdminHeader,
      AdminAside,
      Notify,
      VModalRender
    },

    mixins: [CategoryModals],

    data() {
      return {
        showModal: false,
        activeModal: null
      }
    },

    mounted() {
      modalEvents.$on('showModal', ({ section, modalType }) => {
        this.activeModal = this[section][modalType]
        setTimeout(() => this.showModal = true, 0)
      })
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
