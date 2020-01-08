<template>
  <div class="address">
    <span class="address__line">Москва, ул. Складочная</span>
    <div class="address__metro">
      <div class="address__metro-icon"></div>
      <div class="address__metro-station">метро Савеловская</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="scss">

  .address {
    @include fontPlay($darkBlue, .8em);

    &__metro {
      display: flex;
      align-items: center;

      &-icon {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        background-image: url("../../../assets/img/metro.svg");
        background-size: cover;
      }
    }
  }


</style>
