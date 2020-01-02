<template>
  <div class="category-page">
    <div class="table-wrap">
      <app-table
        :rows="rows"
        :cols="cols"
        @reload="reloadRowItems"
        @create="createNewCategory"
        @update="updateRows"
      />
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
      this.rows = this.allCategories
    },

    methods: {
      ...mapActions({
        fetchAllCategories: `AdminModule/${action.GET_ALL_CATEGORIES}`,
        saveCategory: `AdminModule/${action.SAVE_CATEGORY}`,
        updateCategories: `AdminModule/${action.UPDATE_CATEGORIES}`
      }),

      reloadRowItems() {
        this.rows = null
        this.fetchAllCategories()
          .then(rows => this.rows = rows)
          .then(() => {
            this.$notify({
              type: 'success',
              message: 'Данные обновлены'
            })
          })
      },

      createNewCategory(category) {
        this.saveCategory(category)
          .then(() => this.reloadRowItems())
          .catch(err => {
            this.$notify({
              type: 'danger',
              message: 'Ошибка сервера. Повторите операцию позже'
            })
          })
      },

      async updateRows(categories) {
        await this.updateCategories(categories)
          .then(ctg => this.reloadRowItems())
      }

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
