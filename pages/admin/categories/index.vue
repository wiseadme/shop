<template>
  <div class="category-page">
    <tool-bar
      @create="createCategory"
      @edit="editCategory"
      @download="downloadFile"
      @save="save"
      @delete="deleteCategory"
    />
    <v-modal v-if="create">
      <h1 slot="header">Создать категорию</h1>
      <form slot="body" class="form">
        <div class="form-block">
          <v-input label="Название категории" placeholder="Например игрушки"/>
        </div>
        <div class="form-block">
          <v-input label="Название категории" placeholder="Например игрушки"/>
        </div>
      </form>
      <div slot="footer" class="btn-block">
        <v-button button-type="info" button-text="создать"/>
        <v-button @click="create = false" button-type="warning" button-text="очистить"/>
      </div>
    </v-modal>
    <data-table/>
  </div>
</template>

<script>
  import DataTable from '@/components/AdminLayout/DataTable'
  import ToolBar from '@/components/AdminLayout/ToolBar'
  import VModal from '@/components/ui/VModal'

  export default {
    layout: 'admin',
    components: {
      DataTable,
      ToolBar,
      VModal
    },
    data() {
      return {
        categoryName: '',
        create: false
      }
    },

    methods: {
      createCategory() {
        this.create = !this.create
      },

      editCategory() {
        console.log('edit')
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

  .btn-block{
    display: flex;
    justify-content: space-between;
  }

</style>