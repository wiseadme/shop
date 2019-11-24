<template>
  <aside class="aside">
    <nav class="nav">
      <nuxt-link v-for="it in adminMenu" :key="it.name" class="nav__item" :to="it.link">
        <i class="nav__item-icon material-icons">{{it.icon}}</i>
        <span class="nav__item-name">{{it.name}}</span>
      </nuxt-link>
    </nav>
  </aside>
</template>

<script>
  import adminMenu from '@/schemes/adminMenu.json'

  export default {
    data() {
      return {
        adminMenu
      }
    }
  }
</script>

<style lang="scss">
  .aside{
    position: absolute;
    top: 60px;
    width: $adminAside;
    height: calc(100vh - 60px);
    background: $black;
  }
</style>