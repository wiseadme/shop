<template>
  <div id="app">
    <div class="page-wrap">
      <app-header/>
      <Notify/>
      <div class="container">
        <div class="route-wrap">
          <transition mode="out-in" name="fadeIn">
            <nuxt/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  import Notify from '@/services/Notifications/Notify'
  import VModal from '@/components/ui/VModal'
  import { lStorage } from '../utils'

  export default {
    components: {
      AppHeader,
      Notify,
      VModal
    },

    data() {
      return {
        show: false,
      }
    },

    created() {
      setTimeout(() => this.show = !this.show, 100)
    },

    mounted() {
      if (this.user) {
        lStorage('user', this.user)
      }
    },

    computed: {
      ...mapState({
        user: state => state.AuthModule.user
      })
    },
  }
</script>


<style lang="scss">
  .fadeIn-enter,
  .fadeIn-leave-to {
    opacity: 0;
  }

  .fadeIn-enter-active,
  .fadeIn-leave-active {
    transition: all 0.3s ease-in-out;
  }
</style>
