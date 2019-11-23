<template>
  <div class="wrap">
    <h1>{{'Что то пошло не так. Статус ошибки ' + error.statusCode}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object
    }
  },

  mounted() {

  }
}
</script>
