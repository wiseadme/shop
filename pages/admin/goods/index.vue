<template>
  <div class="category-page">
    <div class="table-wrap">
      <app-table
        :rows="rows"
        :cols="cols"
      />
    </div>
  </div>
</template>

<script>
  import AppTable from '@/components/AppTable'
  import goodsCols from '@/schemes/goodsCols.json'

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
        cols: goodsCols
      }
    },

    async created() {

    },

    methods: {

    },

    computed: {

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
