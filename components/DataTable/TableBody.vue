<template>
  <div class="table-body">
    <div class="table-body__row">

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cols: {
        type: Array,
      },
      rows: {
        type: Array
      }
    },

    created() {
      // console.log(this.rows, this.cols)
    }
  }
</script>