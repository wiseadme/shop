<template>
  <div class='auth-block'>
    <div class="auth-block__inner">
      <i class='material-icons auth-block__icon'>{{!isUser ? 'person' : 'verified_user'}}</i>
      <router-link
        v-if="isUser"
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
        {{!isUser ? 'Войти' : 'Выйти'}}
      </router-link>
    </div>
  </div>
</template>

<script>
  import {lStorage} from '@/utils'

  export default {
    computed: {
      ...mapState({
        isUser: state => state.AuthModule.user
      }),

      user() {
        if (process.browser) {
          const user = lStorage('user')
          return this.isUser ? this.isUser.login : user ? user.login : ''
        }
      }
    },

    methods: {
      ...mapActions({
        logOut: `AuthModule/${action.LOG_OUT_USER}`
      }),

      checkBeforeOut() {
        if (this.isUser) this.logOut()
      }
    }
  }
</script>
<style lang='scss'>
  .auth-block {
    width: 100%;
    padding: 5px;

    &__inner {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__icon {
      font-size: 20px;
      color: $blue
    }

    &__login, &__action {
      @include fontPlay($blue, .8em);
      text-decoration: none;
      line-height: 1.6em;
      margin: 0 10px;
      position: relative;
    }
  }
</style>
