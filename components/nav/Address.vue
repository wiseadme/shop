<template>
  <div class="address">
    <span class="address__line">Москва, ул. Складочная</span>
    <div class="address__metro">
      <div class="address__metro-icon"></div>
      <div class="address__metro-station">Савеловская</div>
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
    color: #040424;
    font-size: .8em;

    &__metro {
      display: flex;

      &-icon {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        background-image: url("../../assets/img/metro.svg");
        background-size: cover;
      }
    }
  }


</style>
