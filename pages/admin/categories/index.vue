<template>
  <div class="category-page">
    <tool-bar
      @create="createCategory"
      @edit="editCategory"
      @download="downloadFile"
      @save="save"
      @delete="deleteCategory"
    />
    <div class="table-wrap">
      <data-table v-if="categoryRows" :rows="categoryRows" :cols="categoryCols"/>
    </div>
  </div>
</template>

<script>
  import DataTable from '@/components/DataTable'
  import ToolBar from '@/components/AdminLayout/ToolBar'
  import categoryCols from '@/schemes/categoryCols.json'

  export default {
    layout: 'admin',
    components: {
      DataTable,
      ToolBar,
    },
    data() {
      return {
        categoryName: '',
        categoryRows: null,
        create: false,
        categoryCols
      }
    },

    created() {
      this.fetchAllCategories().then(({ data: { categories } }) => this.categoryRows = categories)
    },

    methods: {
      ...mapActions({
        fetchAllCategories: `AdminModule/${action.GET_ALL_CATEGORIES}`
      }),
      createCategory() {
        this.$modal('category', 'create')
      },

      editCategory() {
        this.$modal('category', 'update')
      },

      downloadFile() {
        console.log('download')
      },

      save() {
        console.log('save')
      },

      deleteCategory() {
        console.log('delete')
      }
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