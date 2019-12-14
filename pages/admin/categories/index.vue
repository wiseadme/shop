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
      <data-table v-if="rows" :rows="rows" :cols="cols"/>
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
      }),

      createCategory() {
        this.$modal('category', 'create')
      },

      editCategory() {
        this.$modal('category', 'update')
      },

      downloadFile() {
        this.$modal('category', 'download')
      },

      save() {
        this.$modal('category', 'save')
      },

      deleteCategory() {
        this.$modal('category', 'delete')
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
    height: 100%;
  }

  .btn-block {
    display: flex;
    justify-content: space-between;
  }

</style>