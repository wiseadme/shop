<template>
  <div class="wrap">
    <span>{{item.name}}</span>
    <span>{{item.text}}</span>
    <span>{{item.price}}</span>
    <img v-for="sl in item.slides" :key="sl" style="width: 250px;" :src="`/api/image/${sl}`" :alt="item.name">
  </div>
</template>

<script>
  export default {
    props: {},
    async asyncData({ store, route }) {
      let item = ''
      await store.dispatch(`DataModule/${action.GET_PRODUCT_ITEM}`, route.params.item).then(it => item = it)
      return {
        item
      }
    },

    head() {
      return {
        title: this.item.name.trim(),
        meta: [
          { hid: 'description', name: 'description', content: this.item.text },
          { hid: 'description', name: 'description', content: 'My custom description' },
        ]
      }
    }
  }
</script>
