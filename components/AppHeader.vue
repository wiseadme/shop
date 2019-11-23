<template>
  <header class='header'>
    <div class='wrap'>
      <div class='inner-wrap'>
        <div class='header-top'>
          <div class='contact-wrap'>
            <app-contacts />
          </div>
          <div class='address-wrap'>
            <app-address />
          </div>
          <div class='search-wrap'>
            <app-search />
          </div>
          <div class='basket-wrap'>
            <app-basket />
          </div>
          <div class='auth-wrap'>
            <app-auth />
          </div>
        </div>
        <div class='header-bottom'>
          <div class='nav-wrap'>
            <app-navigation :menu-items="menuItems"/>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AppNavigation from './nav/Navigation.vue'
import AppBasket from './nav/Basket.vue'
import AppContacts from './nav/Contacts.vue'
import AppSearch from './nav/Search.vue'
import AppAddress from './nav/Address.vue'
import AppAuth from './nav/Auth.vue'
import menuItems from '../schemes/menu.json'

export default {
  name: 'AppHeader',
  data () {
    return {
      menuItems
    }
  },

  methods: {},

  components: {
    AppNavigation,
    AppBasket,
    AppContacts,
    AppSearch,
    AppAddress,
    AppAuth
  }
}
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
}

.header {
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
}

.header-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
}

.header-bottom{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: $darkBlue;
}

.inner-wrap {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.basket-wrap {
  width: 120px;
}

.search-wrap{
  position: relative;
  display: block;
  width: 340px;
  height: 40px;
  overflow: hidden;
  /* border: 1px solid red; */
}

.contact-wrap {
  display: block;
  width: auto;
}

.address-wrap{
  display: block;
}

.nav-wrap {
  display: block;
  margin: 0 auto;
  /* border: 1px solid rgb(192, 8, 8); */
}
</style>
