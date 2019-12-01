<template>
  <div class="table">
    <TableHeader :cols="categoryCols"/>
  </div>
</template>

<script>
  import TableHeader from './TableHeader'
  import categoryCols from '@/schemes/categoryCols.json'

  export default {
    name: 'DataTable',
    components: {
      TableHeader,
    },
    props: {
      cols: {
        type: Array,
      },
      rows: {
        type: Array
      }
    },

    data() {
      return {
        categoryCols
      }
    }
  }
</script>

<style lang="scss">
  .table{
    width: 100%;
  }
</style>