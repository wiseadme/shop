<template>
  <div class="category-page">
    <tool-bar
      @create="createCategory"
      @edit="editCategory"
      @download="downloadFile"
      @save="save"
      @delete="deleteCategory"
    />
    <data-table/>
  </div>
</template>

<script>
  import DataTable from '@/components/AdminLayout/DataTable'
  import ToolBar from '@/components/AdminLayout/ToolBar'

  export default {
    layout: 'admin',
    components: {
      DataTable,
      ToolBar,
    },
    data() {
      return {
        categoryName: '',
        create: false
      }
    },

    mounted() {

    },

    methods: {
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