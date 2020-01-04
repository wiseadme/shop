<template>
  <div class="page-wrap">
    <app-slider/>
    <app-item/>
  </div>
</template>

<script>
  import AppSlider from '@/components/AppSlider'
  import AppItem from '@/components/AppItem'

  export default {
    async asyncData({ store }) {

    },

    components: {
      AppSlider,
      AppItem
    },

    async created() {

    },

    methods: {},

    computed: {},
  }

</script>

<style lang="scss">

</style>
