<template>
  <div class="item">
    <figure
      class="item-figure"
      @mouseenter="caption = true"
      @mouseleave="caption = false"
    >
      <img class="item-figure__image" :src="`/api/image/${item.slides[0]}`" alt="" title="">
      <figcaption v-show="caption" class="item-figure__caption">
        <span class="item-figure__caption-text">{{item.head}}</span>
      </figcaption>
      <span class="status" v-if="item.status">{{item.status.name}}</span>
    </figure>
    <div class="item-sale">
      <span class="item-sale__price">{{item.price}}</span>
      <span class="item-sale__symbol">₽</span>
    </div>
    <div class="item-info">
      <span class="item-info__head">{{item.head}}</span>
    </div>
    <div class="item-btn">
      <div class="item-btn__button">В корзину</div>
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
    },
    data() {
      return {
        caption: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=PT+Mono&display=swap');

  .item {
    width: 250px;
    padding: 0;
    border: 1px solid $grey;
    border-radius: 3px;
    overflow: hidden;
    @include flexAlign(center, center, column);


    &-figure {
      width: 200px;
      height: 200px;
      margin-top: 20px;
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
      width: 90%;
      height: 50px;
      @include flexAlign(center, center, column);
      margin: 10px 0;

      &__head {
        @include fontExo($darkBlue, 1em);
        padding: 0 5px;
        width: 100%;
        font-family: 'PT Mono', monospace;
      }
    }

    &-sale {
      width: 90%;
      @include flexAlign(center, flex-start);
      padding: 5px;

      &__price {
        @include fontExo($blue, 1.4em);
        font-weight: 700;
      }

      &__symbol {
        color: $blue;
        padding-top: 2px;
        font-weight: 700;
      }
    }

    &-btn {
      margin: 20px;
      width: 90%;
      padding: 5px;

      &__button {
        width: 120px;
        height: 42px;
        border: 1px solid $blue;
        border-radius: 3px;
        cursor: pointer;
        @include flexAlign(center, center);
        @include fontPlay($blue, 1em);
      }
    }
  }
</style>
