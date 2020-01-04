<template>
  <div class="area-wrap">
    <textarea @input="$emit('input', $event.target.value)" class="area" :placeholder="placeholder"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'VArea',
    props: {
      placeholder: {
        type: String
      }
    },

    methods: {

    }
  }
</script>

<style lang="scss">
  .area-wrap{
    width: 100%;
    height: 100%;
  }

  .area{
    width: 100%;
    height: 300px;
    border: 1px solid $blue;
    border-radius: 5px;
    padding: 5px;
  }
</style>