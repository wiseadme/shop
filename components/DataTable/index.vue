<template>
  <div class="table">
    <TableHeader
      :cols="cols"
    />
    <TableBody
      :rows="rows"
      :cols="cols"
    />
  </div>
</template>

<script>
  import TableHeader from './TableHeader'
  import TableBody from './TableBody'


  export default {
    name: 'DataTable',
    components: {
      TableHeader,
      TableBody
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

      }
    }
  }
</script>

<style lang="scss">
  .table{
    width: 100%;
  }
</style>