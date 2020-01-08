<template>
  <div class="category-page">
    <div class="table-wrap">
      <app-table
        :rows="rows"
        :cols="cols"
        :check-diffs="mixCheckBeforeLeave"
        :create-items="createItems"
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
  import group from '@/schemes/groups'

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
        createItems: {
          group
        }
      }
    },

    async created() {
      this.rows = this.allCategories
    },

    methods: {
      ...mapActions({
        fetchAllCategories: `DataModule/${action.GET_ALL_CATEGORIES}`,
        saveCategory: `DataModule/${action.SAVE_CATEGORY}`,
        updateCategories: `DataModule/${action.UPDATE_CATEGORIES}`,
        deleteCategories: `DataModule/${action.DELETE_CATEGORIES}`
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
        allCategories: state => state.DataModule.categories
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
