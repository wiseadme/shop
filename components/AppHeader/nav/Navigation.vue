<template>
  <nav class='nav-block'>
    <div class="nav-block__menu">
      <nuxt-link
        v-for='(item, i) in menuItems'
        class='nav-block__link'
        active-class='nav-block__link-active'
        data-name='nav'
        exact
        :to='item.link'
        :key='item.name + i'
      >
        <i class="material-icons nav-block__icon">{{item.icon}}</i>
        <span class="nav-block__link-text">{{item.name}}</span>
      </nuxt-link>
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
      return {}
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
    display: flex;
    min-width: 120px;
    align-items: center;
    justify-content: center;
    @include fontPlay($white, .8em);
    font-weight: 500;
    text-decoration: none;
    padding: 17px 0;
  }

  .nav-block__icon{
    font-size: 15px;
    margin: 0 10px;
  }

  .nav-block__link-text {
    text-transform: uppercase;
  }

  .nav-block__link-active {
    color: $darkGrey;
  }
</style>
