<template>
  <div class="page-wrap">
    <app-slider/>
  </div>
</template>

<script>
  import AppSlider from '@/components/AppSlider'

  export default {
    async asyncData({ store }) {
      await store.dispatch('AdminModule/GET_ALL_CATEGORIES')
        .then( data => console.log(data, 'eto oni'))
        .catch(err => console.log(err))
    },

    components: {
      AppSlider
    },

    async created() {

    },

    methods: {

    },

    computed: {},
  }

</script>

<style lang="scss">

</style>
