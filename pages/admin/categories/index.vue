<template>
  <div class="category-page">
    <div class="table-wrap">
      <app-table
        :rows="rows"
        :cols="cols"
        :check-diffs="mixCheckBeforeLeave"
        @reload="reloadCategories"
        @create="createNewCategory"
        @update="updateCategoryRows"
        @delete="deleteCategoryRows"
        @differences="diffsHandler"
        @stop-diffs="mixCheckBeforeLeave = $event"
      />
    </div>
  </div>
</template>

<script>
  import AppTable from '@/components/AppTable'
  import categoryCols from '@/schemes/category-cols.json'
  import differences from '@/components/mixins/differences'

  export default {
    layout: 'admin',
    components: {
      AppTable,
    },
    mixins: [differences],

    data() {
      return {
        rows: null,
        cols: categoryCols,
      }
    },

    async created() {
      this.rows = this.allCategories
    },

    methods: {
      ...mapActions({
        fetchAllCategories: `AdminModule/${action.GET_ALL_CATEGORIES}`,
        saveCategory: `AdminModule/${action.SAVE_CATEGORY}`,
        updateCategories: `AdminModule/${action.UPDATE_CATEGORIES}`,
        deleteCategories: `AdminModule/${action.DELETE_CATEGORIES}`
      }),

      reloadCategories() {
        this.rows = null
        this.fetchAllCategories()
          .then(rows => setTimeout(() => this.rows = rows, 500))
          .then(data => {
            this.$notify({
              type: 'success',
              message: 'Данные обновлены'
            })
          })
      },

      createNewCategory(category) {
        this.saveCategory(category)
          .then(() => this.reloadCategories())
          .catch(err => {
            this.$notify({
              type: 'danger',
              message: err
            })
          })
      },

      updateCategoryRows(categories) {
        this.updateCategories(categories)
          .then(ctg => this.reloadCategories())
          .catch(err => {
            this.$notify({
              type: 'danger',
              message: err
            })
          })
      },

      deleteCategoryRows(checkedRows) {
        this.deleteCategories(checkedRows)
          .then(() => this.reloadCategories())
          .catch(err => {
            this.$notify({
              type: 'danger',
              message: err
            })
          })
      }
    },

    computed: {
      ...mapState({
        allCategories: state => state.AdminModule.categories
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
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

</style>
