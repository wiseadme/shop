<template>
  <div class='auth-block'>
    <div class="auth-block__inner">
      <span class='auth-block__icon'></span>
      <router-link
        to='/auth/login'
        class='auth-block__login'
      >
        {{!isLogin ? 'Войти' : 'Выйти'}}
      </router-link>
      <router-link
        v-if="!isLogin"
        to='/auth/registraciya'
        class='auth-block__reg'
      >
        Регистрация
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      ...mapState({
        isLogin: state => state.AuthModule.token
      })
    }
  }
</script>
<style lang='scss'>
  .auth-block {
    min-width: 190px;
    background: $darkBlue;
    padding: 5px;
    border-radius: 5px;
    box-shadow: $boxShadow;

    &__inner {
      width: auto;
      display: flex;
      justify-content: center;
    }

    &__icon {
      width: 15px;
      height: 15px;
      background-image: url('../../assets/img/login.svg');
      background-size: cover;
    }

    &__login, &__reg {
      @include font($white, .8em);
      text-decoration: none;
      line-height: 1.6em;
      margin: 0 10px;
      position: relative;
    }

    &__login:after{
      content: '';
      display: block;
      position: absolute;
      height: 70%;
      width: 2px;
      background: $white;
      right: -12px;
      top: 15%;
    }
  }
</style>
