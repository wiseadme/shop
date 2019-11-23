<template>
  <div>
    <app-header/>
    <transition name="fadeIn" mode="out-in">
      <div v-if="show" class="login-page">
        <nuxt/>
      </div>
    </transition>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader"
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      show: false
    }
  },

  created() {
    setTimeout(() => this.show = !this.show, 100)
  },

  beforeDestroy() {
    this.show = !this.show
  }
};
</script>

<style lang="sass">
.login-page 
  position: absolute
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: calc(100vh - 80px)

</style>

