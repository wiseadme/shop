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
        create: false,
        rows: null,
        cols: categoryCols
      }
    },

    async created() {
      await this.fetchAllCategories()
        .then(rows => this.rows = rows)
        .catch(err => {
          this.$notify({
            type: 'danger',
            message: 'Ошибка: ' + err
          })
        })
    },

    methods: {
      ...mapActions({
        fetchAllCategories: `AdminModule/${action.GET_ALL_CATEGORIES}`
      })
    }
  }
</script>

<style lang="scss" scoped>
  .category-page {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
  }

  .btn-block {
    display: flex;
    justify-content: space-between;
  }

  .table-wrap {
    height: 100%;
  }

</style>
