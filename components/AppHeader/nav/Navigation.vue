<template>
  <nav class='nav-block'>
    <div class="nav-block__menu">
      <div
        v-for='it in mainMenu'
        :key="it.name"
        class="nav-block__item"
        @mouseover="it.show = true"
        @mouseleave="it.show = false"
      >
        <div class="nav-block__link">
          <i class="material-icons nav-block__icon">{{it.icon}}</i>
          <span class="nav-block__link-text">{{it.name}}</span>
        </div>
        <transition name="fadeIn">
          <template>
            <div  v-show="it.show" class="submenu">
              <nuxt-link
                v-for='(t, i) in it.children'
                class='submenu__link'
                active-class='submenu__link-active'
                data-name='nav'
                exact
                :to='t.url'
                :key='t.name + i'
              >
                <div class="submenu__link-item">
                  <i class="material-icons submenu__link-icon">{{t.icon}}</i>
                  <span class="submenu__link-text">{{t.name}}</span>
                </div>
              </nuxt-link>
            </div>
          </template>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navigation',
    props: {
      menuItems: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        mainMenu: [
          { name: 'Каталог', icon: 'view_day', children: this.menuItems, show: false }
        ]
      }
    },

    methods: {}
  }
</script>

<style lang='scss'>
  .nav-block {
    width: 100%;
    height: 100%;
  }

  .nav-list-move {
    opacity: 0;
    transition: all 0.3s;
  }

  .nav-block__menu {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-block__link {
    @include fontPlay($white, .8em);
    display: flex;
    min-width: 120px;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    text-decoration: none;
    padding: 17px 0;
    cursor: default;
    height: 60px;

    &:hover {
      color: $blue;
    }
  }

  .nav-block__icon {
    font-size: 15px;
    margin: 0 10px;
  }

  .nav-block__link-text {
    text-transform: uppercase;
  }

  .nav-block__link-active {
    color: $darkGrey;
  }

  .submenu {
    @include flexAlign(flex-start, flex-start, column);
    position: absolute;
    top: 120px;
    left: 10%;
    width: 80%;
    background: $blue;
    box-shadow: $boxShadow;
    z-index: 15;

    &__link {
      min-width: 120px;
      font-weight: 500;
      text-decoration: none;
      padding: 17px 10px;
      cursor: pointer;

      &:hover {
        background: $white;
      }
      &:hover .submenu__link-text,
      &:hover .submenu__link-icon{
        color: $blue;
      }
    }

    &__link-item {
      @include flexAlign(center, flex-start);
    }

    &__link-text {
      @include fontPlay($white, .9em);
    }

    &__link-icon {
      color: $white;
      margin: 0 5px;
      font-size: 15px;
    }
  }
</style>
