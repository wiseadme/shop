<template>
  <div class='auth-block'>
    <div class="auth-block__inner">
      <i class='material-icons auth-block__icon'>{{!isLogin ? 'person' : 'verified_user'}}</i>
      <router-link
        v-if="isLogin"
        to='/profile'
        class='auth-block__reg'
      >
        {{user ? user : ''}}
      </router-link>
      <router-link
        to='/auth/user'
        class='auth-block__login'
        @click.native.prevent="checkBeforeOut"
      >
        {{!isLogin ? 'Войти' : 'Выйти'}}
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      ...mapState({
        isLogin: state => state.AuthModule.token,
      }),

      user() {
        if (process.browser) {
          const user = JSON.parse(localStorage.getItem('user'))
          if (user) return user.login
        }
      }
    },

    methods: {
      ...mapActions({
        logOut: `AuthModule/${action.LOG_OUT_USER}`
      }),

      checkBeforeOut() {
        if (this.isLogin) this.logOut()
      }
    },

    watch: {
      '$route'(to) {
        console.log(to)
      }
    }
  }
</script>
<style lang='scss'>
  .auth-block {
    min-width: 190px;

    &__inner {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__icon {
      font-size: 5px;
      color: $blue
    }

    &__login, &__reg {
      @include fontPlay($darkBlue, .8em);
      text-decoration: none;
      line-height: 1.6em;
      margin: 0 10px;
      position: relative;
    }
  }
</style>
