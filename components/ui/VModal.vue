<template>
  <div class="modal-wrap">
    <div class="modal">
      <div class="modal__header">
        <slot name="header"></slot>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VModal'
  }
</script>

<style lang="scss" scoped>
  .modal-wrap {
    @include flexAlign(center);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
  }

  .modal{
    width: 500px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: $boxShadow;
    &__header{
      @include fontPlay($white, 1.2em);
      text-align: center;
      padding: 15px;
      background: $blue;
    }
    &__body{
      background: $white;
      padding: 15px;
    }
    &__footer{
      padding: 15px;
      background: $white;
    }
  }
</style>