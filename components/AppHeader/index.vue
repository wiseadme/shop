<template>
  <header class='header'>
    <div class='header__inner'>
      <div class='header__top'>
        <div class="inner-top">
          <div class='header__contact'>
            <app-contacts/>
          </div>
          <div class='header__address'>
            <app-address/>
          </div>
          <div class='header__search'>
            <app-search/>
          </div>
          <div class='header__basket'>
            <app-basket/>
          </div>
          <div class='header__auth'>
            <app-auth/>
          </div>
        </div>
      </div>
      <div class='header__bottom'>
        <div class="inner-bottom">
          <div class='nav-wrap'>
            <app-navigation :menu-items="categories"/>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import AppNavigation from './elements/Navigation.vue'
  import AppBasket from './elements/Basket.vue'
  import AppContacts from './elements/Contacts.vue'
  import AppSearch from './elements/Search.vue'
  import AppAddress from './elements/Address.vue'
  import AppAuth from './elements/Auth.vue'

  export default {
    name: 'AppHeader',

    components: {
      AppNavigation,
      AppBasket,
      AppContacts,
      AppSearch,
      AppAddress,
      AppAuth
    },

    data() {
      return {

      }
    },

    created() {

    },

    computed: {
      ...mapState({
        categories: state => state.DataModule.categories
      })
    }
  }
</script>


<style lang='scss' scoped>
  .header {
    position: relative;
    width: 100%;
    height: 120px;
    border-bottom: 1px solid $grey;

    &__inner {
      width: 100%;
      height: 120px;
      display: flex;
      flex-direction: column;
    }

    &__top {
      display: flex;
      justify-content: center;
      background: $white;
    }

    &__bottom {
      display: flex;
      justify-content: center;
    }

    &__basket {
      width: 120px;
    }

    &__search {
      display: block;
      width: 350px;
      height: 40px;
      overflow: hidden;
    }

    &__contact {
      display: block;
      width: auto;
      padding: 0 12px;
    }

    &__address {
      display: block;
    }

    &__auth {
      display: block;
      min-width: 170px;
      margin-right: 10px;
    }

    &__nav {
      display: block;
      margin: 0 auto;
      /* border: 1px solid rgb(192, 8, 8); */
    }
  }

  .inner-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1600px;
    height: 60px;
  }

  .inner-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1600px;
    height: 60px;


  }
</style>
