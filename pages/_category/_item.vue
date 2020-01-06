<template>
  <div class="wrap">
    <span>{{item.name}}</span>
    <span>{{item.text}}</span>
    <span>{{item.price}}</span>
    <img :src="`/api/image/${item.slides[0]}`" alt="">
  </div>
</template>

<script>
  export default {
    props: {},
    async asyncData({ store, route }) {
      let item = ''
      await store.dispatch(`AdminModule/${action.GET_PRODUCT_ITEM}`, route.path).then(it => item = it)
      return {
        item
      }
    },

    head() {
      return {
        title: this.item.name,
        meta: [
          { hid: 'description', name: 'description', content: this.item.text },
          { hid: 'description', name: 'description', content: 'My custom description' },

        ]
      }
    }
  }
</script>
