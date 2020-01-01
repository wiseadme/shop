<template>
  <aside :class="['aside', {'aside-wide-mode': wideMode}]">
    <nav class="nav">
      <div
        v-for="it in adminMenu"
        :key="it.name"
        class="nav__item"
        @mouseenter="it.show = true"
        @mouseleave="it.show = false"
      >
        <div class="item-inner">
          <i class="nav__item-icon material-icons">{{it.icon}}</i>
          <span class="nav__item-name">{{it.name}}</span>
        </div>
        <transition name="scaleXIn">
          <template v-if="it.child">
            <div v-if="it.show" class="tooltip">
              <span class="tooltip__head">{{it.name}}</span>
              <nuxt-link
                v-for="t in it.child"
                :key="t.name"
                exact
                :to="t.link"
                :data-link="t.link"
                class="tooltip__item"
                @click.native="it.show = false"
              >
                <span class="tooltip__name">{{t.name}}</span>
              </nuxt-link>
            </div>
          </template>
        </transition>
      </div>
    </nav>
    <div
      :class="['wide-btn', wideMode ? 'wide-btn--inline' : '']"
      @click="wideMode = !wideMode"
    >
      <span
        v-for="it in 9" :key="it"
        :class="['wide-btn__item', 'item' + it]"
      ></span>
    </div>
  </aside>
</template>

<script>
  import adminMenu from '@/schemes/adminMenu.json'

  export default {
    data() {
      return {
        adminMenu,
        wideMode: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .aside {
    position: absolute;
    z-index: 1000;
    top: 60px;
    width: 60px;
    height: calc(100vh - 60px);
    background: $darkBlue;
    transition: .2s all;

    &-wide-mode {
      width: 250px;
    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    transition: width .2s;

    &__item {
      width: 100%;
      height: 50px;
      display: flex;
      text-decoration: none;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        background: $blue;
      }

      &:hover {
        .nav__item-icon {
          color: $white;
        }
      }

      &-icon {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: $blue;
        font-size: 20px;
        transition: all .2s;
      }

      &-name {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 60px;
        width: 150px;
        @include fontExo($white, .8em)
      }
    }
  }

  .item-inner{
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 100%;
  }

  .tooltip {
    position: absolute;
    top: 0;
    left: 100%;
    background: $darkBlue;
    z-index: 999;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 10px;
    box-shadow: $boxShadow;
    transform-origin: left;
    overflow: hidden;

    &__head {
      @include fontPlay($white, 1em);
      @include flexAlign(center, flex-start);
      background: $blue;
      width: 250px;
      height: 50px;
      padding-left: 10px;
    }

    &__item {
      @include fontPlay($white, .8em);
      padding: 15px 10px;
      text-decoration: none;
      transition: all .1s linear;

      &:hover {
        padding-left: 13px;
        background: #06145c;
      }
    }
  }

  .wide-btn {
    position: absolute;
    bottom: 0;
    width: 60px;
    height: 60px;
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    cursor: pointer;
    transition: all .1s;

    &:hover {
      .wide-btn__item {
        background: $blueLight;
      }
    }

    &--inline {
      width: 100%;

      .wide-btn__item {
        margin: 3.7%;
      }
    }

    &__item {
      width: 8px;
      height: 8px;
      margin: 3px;
      background: $blue;
      border-radius: 50%;
      transition: all .3s;
    }
  }
</style>
