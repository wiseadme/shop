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
  .aside {
    position: absolute;
    top: 60px;
    width: $adminAside;
    height: calc(100vh - 60px);
    background: $black;
  }

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__item {
      width: 100%;
      padding: 15px 0 15px 10px;
      display: flex;
      text-decoration: none;
      align-items: center;
      justify-content: flex-start;

      &:hover {
        background: #373737;
      }

      &-icon {
        color: $green;
        font-size: 20px;
        margin: 0 10px;
      }

      &-name {
        @include fontPlay($white, .8em)
      }
    }
  }
</style>