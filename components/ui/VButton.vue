<template>
  <button @click.prevent="$emit('click')" :class="['v-button', buttonType, btnClass]">
    {{ buttonText }}
  </button>
</template>

<script>
  export default {
    props: {
      buttonText: {
        type: String
      },
      buttonType: {
        type: String
      },
      btnClass: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .v-button {
    position: relative;
    width: auto;
    min-width: 120px;
    height: 38px;
    min-height: 38px;
    font-size: 0.8em;
    text-transform: uppercase;
    color: #ffffff;
    cursor: pointer;
    border-radius: 3px;
    border: none;
    outline: none;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.3s ease;

    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      background: rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }

    &:hover {
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.5);
    }

    &:hover:after {
      height: 100%;
      opacity: 0;
    }
  }
</style>
