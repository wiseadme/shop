<template>
  <div class="login-page">
    <transition name="fadeIn" mode="out-in">
      <app-form
        v-if="!isLogin && !user"
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
      return {}
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (!vm.isLogin) {
          next()
        } else {
          vm.$router.replace('/')
        }
      })
    },

    methods: {
      ...mapActions({
        setUser: `AuthModule/${action.SET_USER}`
      })
    },

    computed: {
      ...mapState({
        isLogin: state => state.AuthModule.token,
        user: state => state.AuthModule.user
      })

    },

    watch: {}
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
