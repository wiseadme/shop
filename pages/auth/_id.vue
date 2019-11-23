<template>
  <div class="login-page">
    <transition name="fadeIn" mode="out-in">
      <app-form
        v-if="!isAuthenticated && !getUser"
        @alert="alert = true"
        @sended="alert = $event"
        ref="form"
      />
    </transition>
  </div>
</template>

<script>
  import AppForm from '@/components/AppForm'

  export default {
    layout: 'admin',
    components: {
      AppForm,
    },

    data() {
      return {

      }
    },

    methods: {
      ...mapActions({
        setUser: `AuthModule/${action.SET_USER}`
      })
    },

    computed: {
      ...mapGetters({
        isAuthenticated: 'AuthModule/isAuthenticated',
        getUser: 'AuthModule/getUser',
        getToken: 'AuthModule/getToken',
        getResponse: 'AuthModule/getResponse'
      })
    },

    watch: {

    }
  }
</script>

<style lang="scss" scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
