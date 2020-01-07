<template>
  <nuxt-link :to="pageLink" class="item" prefetch>
    <figure
      class="item-figure"
    >
      <img class="item-figure__image" :src="`/api/image/${item.slides[0]}`" alt="" title="">
      <figcaption class="item-figure__caption">
        <span class="item-figure__caption-text">{{item.head}}</span>
      </figcaption>
    </figure>
    <div class="item-sale">
      <span class="item-sale__price">{{item.price}}</span>
      <span class="item-sale__symbol">₽</span>
    </div>
    <div class="item-actions">
      <span v-if="item.status" class="item-actions__status">{{item.status.name}}</span>
    </div>
    <div class="item-info">
      <span class="item-info__head">{{item.head}}</span>
    </div>
    <div class="item-btn">
      <div class="item-btn__button">В корзину</div>
    </div>
  </nuxt-link>
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
    },

    created() {
      console.log(this.itemUrl)
    },

    computed: {
      pageLink() {
        return `${this.item.category.url}/${this.item.url}`
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=PT+Mono&display=swap');

  .item {
    width: 250px;
    padding: 0;
    text-decoration: none;

    border-radius: 3px;
    overflow: hidden;
    @include flexAlign(center, center, column);
    box-shadow: $boxShadow;


    &-figure {
      width: 250px;
      height: 150px;
      position: relative;

      &:hover .item-figure__caption {
        opacity: 1;
      }

      &__image {
        width: 100%;
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
        opacity: 0;
        transition: opacity .2s;

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
      position: relative;

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
      margin: 10px 0 0 0;

      &__price {
        @include fontExo($darkBlue, 1.4em);
        font-weight: 700;
      }

      &__symbol {
        color: $darkBlue;
        padding-top: 2px;
        font-weight: 700;
      }
    }

    &-btn {
      margin: 20px 0;
      width: 90%;
      padding: 5px;

      &__button {
        width: 120px;
        height: 42px;
        border: 1px solid $blue;
        border-radius: 3px;
        background: transparent;
        cursor: pointer;
        @include flexAlign(center, center);
        @include fontPlay($blue, 1em);
        transition: all .3s;

        &:hover {
          border: transparent;
          background: $blue;
          color: $white;
        }
      }
    }

    &-actions {
      position: relative;
      width: 90%;
      height: 36px;

      &__status {
        position: absolute;
        bottom: 5px;
        left: 5px;
        padding: 5px;
        background: $blue;
        border-radius: 3px;
        @include fontExo($white, .9em)
      }
    }
  }
</style>
