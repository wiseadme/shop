<template>
  <div class='auth-block'>
    <span class='auth-block__icon'></span>
    <router-link @click.native="checkLoginStatus" to='/auth/login' class='auth-block__login'>Войти</router-link>
    <router-link @click.native="checkLoginStatus" to='/auth/registraciya' class='auth-block__reg'>Регистрация</router-link>
  </div>
</template>
<script>
export default {
  methods: {
    checkLoginStatus(){
      if (this.isLogin) {
        this.$router.replace('/')
      }
    }
  },

  computed:{
    ...mapState({
      isLogin: state => state.AuthModule.logedIn
    })
  }
}
</script>
<style lang='css'>
  .auth-block{
    display: flex;
    justify-content: space-around;
    font-size: .8em;
    width: auto;
    /* border: 1px solid red; */
  }
  .auth-block__icon{
    width: 15px;
    height: 15px;
    background-image: url('../../assets/img/login.svg');
    background-size: cover;
  }
  .auth-block__login, .auth-block__reg{
    color: #040424;
    text-decoration: none;
    margin-left:5px;
  }
</style>
