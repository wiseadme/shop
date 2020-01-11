<template>
  <div class="main-page">
    <div class="slider-wrap">
      <app-slider/>
    </div>
    <div class="items-wrap">
      <app-item v-for="it in products" :key="it._id" :item="it"/>
    </div>
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

    created() {

    },

    methods: {},

    computed: {
      ...mapState({
        products: state => state.DataModule.products,
        categories: state => state.DataModule.categories,
      })
    },
  }

</script>

<style lang="scss">
  .main-page {
    width: 1440px;
    height: 100%;
    margin: 0 auto;
  }

  .items-wrap {
    width: 100%;
  }

  .slider-wrap {
    padding: 10px 0;
  }

  .item-wrap {
    display: inline-block;
    margin: 0;
    width: calc(100% / 5);
    min-width: 220px;

    &:nth-child(6n) {
      border-right: 1px solid $grey;
    }
  }
</style>
