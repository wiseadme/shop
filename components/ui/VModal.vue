<template>
  <div class="modal-wrap">
    <div class="modal">
      <div :class="['modal__header', type]">
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
    name: 'VModal',
    props: {
      type: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-wrap {
    @include flexAlign(center, center);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
  }

  .modal {
    min-width: 450px;
    box-shadow: $boxShadow;
    border-radius: 5px;
    background: $white;

    &__header {
      @include fontExo($white, 1.2em);
      text-align: center;
      padding: 15px;
      background: $blue;
    }

    &__body {
      @include fontExo($darkBlue, 1em);
      position: relative;
      background: $white;
      max-height: 70vh;
    }

    &__footer {
      padding: 15px;
      background: $white;
    }

    &__buttons-block {
      display: flex;
      justify-content: center;
    }
  }

  .info{

  }

</style>
