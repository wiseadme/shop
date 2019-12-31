<template>
  <div class="category-page">
    <div class="table-wrap">
      <app-table :rows="rows" :cols="cols"/>
    </div>
  </div>
</template>

<script>
  import AppTable from '@/components/AppTable'
  import categoryCols from '@/schemes/categoryCols.json'

  export default {
    layout: 'admin',
    components: {
      AppTable,
    },

    data() {
      return {
        categoryName: '',
        rows: null,
        create: false,
        cols: categoryCols
      }
    },

    async created() {
      this.rows = this.allCategories
    },

    methods: {
      ...mapActions({
        fetchAllCategories: `AdminModule/${action.GET_ALL_CATEGORIES}`
      })
    },

    computed: {
      ...mapState({
        allCategories: state => state.AdminModule.allCategories
      })
    }
  }
</script>

<style lang="scss" scoped>
  .category-page {
    width: 100%;
    height: 100%;
  }

  .btn-block {
    display: flex;
    justify-content: space-between;
  }

</style>
