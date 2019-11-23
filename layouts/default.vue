<template>
  <div id="app">
    <div class="container">
      <app-header/>
      <div class="route-wrap">
        <transition mode="out-in" name="fadeIn">
          <nuxt/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  import * as api from '@/api'

  export default {
    components: {
      AppHeader,
    },
    data() {
      return {
        show: false,
      }
    },

    created() {
      setTimeout(() => this.show = !this.show, 100)
    },
  }
</script>


<style lang="scss">
  @import '@/assets/scss/main.scss';

  .fadeIn-enter,
  .fadeIn-leave-to {
    opacity: 0;
  }

  .fadeIn-enter-active,
  .fadeIn-leave-active {
    transition: all 0.3s ease-in-out;
  }
</style>
