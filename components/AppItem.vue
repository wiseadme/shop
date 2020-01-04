<template>
  <div class="item">
    <figure class="item-figure">
      <img class="item-figure__image" src="/api/image/vuejs-patterny/large-23.jpg" alt="" title="">
      <figcaption class="item-figure__caption"></figcaption>
    </figure>
    <div class="item-info">
      <span class="item-info__head"></span>
      <span class="item-info__desc"></span>
    </div>
    <div class="item-sale">
      <span class="item-sale__rating"></span>
      <span class="item-sale__price"></span>
      <div class="item-sale__btn"></div>
    </div>
  </div>
</template>

<style lang="scss">
  .item {
    width: 300px;
    max-width: 25%;
    border: $border;
    padding: 5px;
    @include flexAlign(center, center, column);

    &-figure {
      width: 280px;
      height: 280px;
      border: $border;

      &__image {
        width: auto;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>