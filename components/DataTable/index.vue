<template>
  <div class="table">
    <TableFunctions :func="func"/>
    <TableHeader :cols="categoryCols"/>
  </div>
</template>

<script>
  import TableHeader from './TableHeader'
  import TableFunctions from './TableFunctions'
  import categoryCols from '@/schemes/categoryCols.json'

  export default {
    name: 'DataTable',
    components: {
      TableHeader,
      TableFunctions
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