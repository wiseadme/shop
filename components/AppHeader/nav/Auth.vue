<template>
  <div class='auth-block'>
    <div class="auth-block__inner">
      <i class='material-icons auth-block__icon'>{{!isLogin ? 'person' : 'verified_user'}}</i>
      <router-link
        v-if="isLogin"
        to='/profile'
        class='auth-block__login'
      >
        {{user ? user : ''}}
      </router-link>
      <router-link
        to='/auth'
        class='auth-block__action'
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
        isUser: state => state.AuthModule.user
      }),

      user() {
        if (process.browser) {
          const user = JSON.parse(localStorage.getItem('user'))
          return this.isUser ? this.isUser.login : user ? user.login : ''
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
    }
  }
</script>
<style lang='scss'>
  .auth-block {
    width: 100%;

    &__inner {
      width: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &__icon {
      font-size: 20px;
      color: $blue
    }

    &__login, &__action {
      @include fontPlay($darkBlue, .8em);
      text-decoration: none;
      line-height: 1.6em;
      margin: 0 10px;
      position: relative;
    }
  }
</style>
