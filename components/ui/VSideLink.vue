<template>
  <nuxt-link :to="link" class="link">
    <div class="icon-wrap">
      <svg class="link__icon" width="24" height="24" viewBox="0 0 24 24">
        <path fill="#FFFFFF" :d="icon"/>
      </svg>
    </div>
    <div class="name-wrap">
      <span class="link__name">{{name}}</span>
    </div>
  </nuxt-link>
</template>

<script>

export default {
  props: {
    name: {
      type: String
    },

    link: {
      type: String
    },

    icon: {
      type: String
    }
  }
}
</script>

