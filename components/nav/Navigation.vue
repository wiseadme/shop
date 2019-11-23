<template>
  <nav class='nav-block'>
    <div class="nav-block__menu">
      <router-link
        v-for='(item, i) in menuItems'
        class='nav-block__link'
        active-class='nav-block__link-active'
        data-name='nav'
        exact
        :to='item.link'
        :key='item.name + i'
      >
        <span class="nav-block__link-text">{{item.name.toUpperCase()}}</span>
      </router-link>
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
  data () {
    return {

    }
  },

  methods: {

  }
}
</script>
<style lang='css'>
.nav-block {
  width: 100%;
  max-width: 700px;
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
  /* border: 1px solid rgb(8, 192, 69); */

}
.nav-block__link {
  color: rgb(167, 160, 160);
  text-decoration: none;
  line-height: 52px;
  padding: 0 10px 0 10px;
  /* border: 1px solid red; */
}

.nav-block__link-text{
  padding: 10px 20px;
  font-size: .8em;
  /* border: 1px solid red; */
}

.nav-block__link-active {
  color: rgb(255, 255, 255);
}
</style>
