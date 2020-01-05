<template>
  <div class="item">
    <figure class="item-figure">
      <img class="item-figure__image" :src="`/api/image/${item.slides[1]}`" alt="" title="">
      <figcaption class="item-figure__caption">
        <span class="item-figure__caption-text">{{item.head}}</span>
      </figcaption>
    </figure>
    <div class="item-info">
      <span class="item-info__head">{{item.head}}</span>
      <span class="item-info__desc">{{item.text.slice(0, 8) + '...'}}</span>
    </div>
    <div class="item-sale">
      <span class="item-sale__rating">цена</span>
      <span class="item-sale__price">{{item.price}}</span>
    </div>
    <div class="item-btn">
      <div class="item-btn__button"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item {
    width: 250px;
    padding: 0;
    box-shadow: $boxShadow;
    @include flexAlign(center, center, column);

    &-figure {
      width: 250px;
      height: 250px;
      position: relative;

      &__image {
        width: auto;
        height: 100%;
        object-fit: cover;
      }

      &__caption {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.4);

        &-text {
          position: absolute;
          top: 50%;
          left: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
          @include fontPlay($white, .8em);
        }
      }
    }

    &-info {
      @include flexAlign(center, center, column);

      &__head {
        @include fontPlay($blue, 1em);
        margin: 10px;
      }
    }
  }
</style>
