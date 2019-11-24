<template>
  <no-ssr v-if="!toggleForm">
    <form key="login" class="form">
      <div class="form-head">
        <h2 class="form-head__text">
          {{ !isRegistration ? 'Авторизация' : 'Регистрация' }}
        </h2>
      </div>
      <div class="form-block">
        <div class="input-wrap">
          <v-input
            v-model="userLogin"
            pre-icon="account_circle"
            :required="true"
            label="логин"
            ref="login"
            clear-icon="info"
            popover-message="hello from good"
            @focus.native="show"
          />
        </div>
        <div class="input-wrap">
          <v-input
            v-if="isRegistration"
            v-model="userEmail"
            :required="true"
            pre-icon="email"
            label="почта"
            ref="email"
          />
        </div>
        <div class="input-wrap">
          <v-input
            v-model="userPassword"
            :required="true"
            pre-icon="more_horiz"
            remind="Забыли пароль?"
            remind-to="/auth/restore"
            label="пароль"
            type="password"
            ref="password"
          />
        </div>
        <div class="input-wrap">
          <v-input
            v-if="isRegistration"
            v-model="confPassword"
            :required="true"
            pre-icon="more_horiz"
            label="повторите пароль"
            type="password"
            ref="confPassword"
          />
        </div>
      </div>
      <div class="btn-block">
        <v-button
          ref="send"
          :data-api="!isRegistration ? '/auth/login' : '/auth/registration'"
          :buttonText="!isRegistration ? 'войти' : 'отправить'"
          btn-class="v-button-custom"
          buttonType="info"
          @click="sendUserParams"
        />
        <nuxt-link
          to=""
          @click.native.prevent="changeForm"
          class="btn-block__auth-link"
        >
          {{!isRegistration ? 'Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти'}}
        </nuxt-link>
      </div>
    </form>
  </no-ssr>
</template>

<script>
  export default {
    layout: 'login',
    data() {
      return {
        userLogin: '',
        userEmail: '',
        userPassword: '',
        confPassword: '',
        isLogin: true,
        isRegistration: false,
        toggleForm: false,
        messages: {
          loginSuccess: {
            type: 'success',
            message: 'Добро пожаловать в наш магазин'
          },
          loginFail: {
            type: 'danger'
          }
        }
      }
    },
    created() {
      this.toggleForm = false
    },
    methods: {
      ...mapActions({
        login: `AuthModule/${action.LOGIN_USER}`,
        create: `AuthModule/${action.CREATE_USER}`
      }),

      changeForm() {
        this.isRegistration = !this.isRegistration
        this.isLogin = !this.isLogin
        this.toggleForm = !this.toggleForm
        setTimeout(() => (this.toggleForm = !this.toggleForm), 100)
      },

      sendUserParams() {
        const param = {
          data: { login: this.userLogin, email: this.userEmail, password: this.userPassword }
        }
        this.isLogin ? this.loginUser(param) : this.createUser(param)
      },

      loginUser(param) {
        this.login(param).then(() => {
          this.$notify({
            type: this.messages.loginSuccess.type,
            message: this.messages.loginSuccess.message
          })
          setTimeout(() => this.$router.replace('/'), 1000)
        })
          .catch(err => {
            this.$notify({
              type: this.messages.loginFail.type,
              message: err.response.status + ' ' + err.response.data.message
            })
          })
      },

      createUser(param) {
        this.create(param)
          .then(res => this.$notify({
            type: 'success',
            message: res.message
          }))
          .catch(err => this.$notify({
            type: 'danger',
            message: err.response.status + ' ' + err.response.data.message
          }))
      }
    },

    computed: {
      ...mapState({
        token: state => state.AuthModule.token
      })
    }
  }
</script>

<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    margin: auto;
    border-radius: 5px;
    background: $white;
    box-shadow: $boxShadow;
    overflow: hidden;

    &-block {
      width: 90%;
      position: relative;
      margin: 20px 0 10px 0;
    }

    &-head {
      width: 100%;
      height: auto;
      background: $white;

      &__text {
        width: 100%;
        text-align: center;
        padding: 15px 0;
        line-height: 18px;
        @include fontPlay($blue, 1.5em);
      }
    }
  }

  .input-wrap {
    margin-bottom: 20px;
  }

  .btn-block {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    position: relative;
    margin: 10px 0;

    &__auth-link {
      text-decoration: none;
      margin: 20px 0;
      @include fontExo($blueLight, .8em);

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .v-button-custom {
    width: 100%;
  }
</style>