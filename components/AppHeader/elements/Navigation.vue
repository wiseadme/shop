<template>
  <nav class='nav-block'>
    <div class="nav-block__menu">
      <ul
        v-for='it in groups'
        :key="it.name"
        class="nav-block__item"
        @mouseover="it.sub = true"
        @mouseleave="it.sub = false"
      >
        <li class="nav-block__link" v-if="it.show">
          <i class="material-icons nav-block__icon">{{it.icon}}</i>
          <span class="nav-block__link-text">{{it.name}}</span>
        </li>
        <transition name="fadeIn">
          <template>
            <div v-show="it.sub && it.children" class="submenu">
              <ul class="submenu__block">
                <li
                  v-for='(t, i) in it.children'
                  class='submenu__link'
                  data-name='nav'
                  @click='$router.push(t.url)'
                  :key='t.name + i'
                >
                  <div class="submenu__link-item">
                    <i v-if="t.icon" class="material-icons submenu__link-icon">{{t.icon}}</i>
                    <span class="submenu__link-text">{{t.name}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </transition>
      </ul>
    </div>
  </nav>
</template>

<script>
  import groups from '@/schemes/groups'
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
        groups,
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
    @include fontPlay($darkBlue, .8em);
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
    position: absolute;
    top: 120px;
    left: 10%;
    width: 80%;
    min-height: 200px;
    background: $white;
    box-shadow: $boxShadow;
    z-index: 15;

    &__block {
      display: flex;
      position: relative;
      width: 120px;
      height: 200px;
      flex-direction: column;
      flex-wrap: wrap;
      &:after{
        content: "";
        display: block;
        height: 90%;
        width: 1px;
        position: absolute;
        top: 5%;
        right: -1px;
        background: $grey;

      }
    }

    &__link {
      @include flexAlign(center, center);
      width: 120px;
      height: 50px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        background: $blue;
      }

      &:hover .submenu__link-text,
      &:hover .submenu__link-icon {
        color: $white;
      }
    }

    &__link-item {
      @include flexAlign(center, flex-start);
    }

    &__link-text {
      @include fontPlay($darkBlue, .9em);
      text-transform: uppercase;
    }

    &__link-icon {
      color: $darkBlue;
      margin: 0 5px;
      font-size: 15px;
    }
  }
</style>
