<template>
  <aside class="aside">
    <nav class="nav">
      <div
        v-for="it in adminMenu"
        :key="it.name"
        class="nav__item"
        @mouseenter="it.show = true"
        @mouseleave="it.show = false"
      >
        <i class="nav__item-icon material-icons">{{it.icon}}</i>
        <span class="nav__item-name">{{it.name}}</span>
        <transition name="scaleXIn">
          <template v-if="it.children">
            <div v-show="it.show" class="tooltip">
              <span class="tooltip__head">{{it.name}}</span>
              <nuxt-link
                v-for="t in it.children"
                :key="t.name"
                :to="t.link"
                :data-link="t.link"
                class="tooltip__item"
              >
                <span class="tooltip__name">{{t.name}}</span>
              </nuxt-link>
            </div>
          </template>
        </transition>
      </div>
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

<style lang="scss" scoped>
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
      position: relative;

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

  .tooltip {
    position: absolute;
    top: 0;
    left: 100%;
    background: $black;
    z-index: 999;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 10px;
    box-shadow: $boxShadow;
    transform-origin: left;
    overflow: hidden;

    &__head {
      @include fontPlay($white, .8em);
      display: block;
      background: $green;
      width: 250px;
      padding: 17px 20px;
    }

    &__item {
      @include fontPlay($white, .8em);
      padding: 15px 10px;
      text-decoration: none;
      transition: all .1s linear;

      &:hover {
        padding-left: 13px;
        background: #373737;
      }
    }
  }
</style>