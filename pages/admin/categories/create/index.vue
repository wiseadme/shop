<template>
  <div class="category-page">
    <DataTable/>
  </div>
</template>

<script>
  import DataTable from '@/components/DataTable'

  export default {
    layout: 'admin',
    components: {
      DataTable
    },
    data() {
      return {
        categoryName: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category-page {
    width: 100%;
    height: 100%;
  }

</style>