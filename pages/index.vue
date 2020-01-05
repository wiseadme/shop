<template>
  <div class="main-page">
    <div class="slider-wrap">
      <app-slider/>
    </div>
    <div class="items-wrap">
      <div class="item-wrap" v-for="it in products" :key="it._id">
        <app-item :item="it"/>
      </div>
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

    async created() {

    },

    methods: {},

    computed: {
      ...mapState({
        products: state => state.AdminModule.products
      })
    },
  }

</script>

<style lang="scss">
  .main-page{
    width: 1600px;
    max-width: 90%;
    height: 100%;
    margin: 0 auto;
  }
  .items-wrap {
    width: 100%;
    @include flexAlign(center, flex-start);
    flex-wrap: wrap;
  }

  .slider-wrap{
    padding: 10px 0;
  }

  .item-wrap {
    display: block;
    margin: 8px;
  }
</style>
