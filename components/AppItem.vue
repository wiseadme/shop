<template>
  <div class="item">
    <div
      class="item-figure"
    >
      <img class="item-figure__image" :src="`/api/image/${item.slides[0]}`" alt="" title="">
      <div class="item-actions">
        <span v-if="item.stock.name !== 'нет'" class="item-actions__stock">{{`Акция ${item.stock.name}`}}</span>
        <span v-if="item.discount" class="item-actions__discount">{{`-${item.discount}%`}}</span>
      </div>
    </div>
    <div class="item-sale">
      <span class="item-sale__price">{{item.price}}</span>
      <span class="item-sale__symbol">₽</span>
      <span v-if="item.status" class="item-sale__status">{{item.status.name}}</span>
    </div>
    <div class="item-info">
      <nuxt-link :to="pageLink" class="item-info__head" prefetch>{{item.head}}</nuxt-link>
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
    },

    computed: {
      pageLink() {
        return `/${this.item.category.url}/${this.item.url}`
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=PT+Mono&display=swap');

  .item {
    width: 220px;
    padding: 10px;
    text-decoration: none;
    border-radius: 3px;
    overflow: hidden;
    @include flexAlign(center, center, column);
    border: 1px solid $grey;

    &-figure {
      width: 200px;
      height: 200px;
      position: relative;

      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-info {
      width: 100%;
      height: 50px;
      @include flexAlign(center, center, column);
      position: relative;

      &__head {
        @include fontPlay($darkGrey, .9em);
        text-decoration: none;
        padding: 0 5px;
        width: 100%;
        &:hover{
          color: $blue;
        }
      }
    }

    &-sale {
      width: 100%;
      @include flexAlign(center, flex-start);
      padding: 5px;
      margin: 10px 0 0 0;

      &__status {
        padding: 5px;
        background: $blue;
        border-radius: 3px;
        @include fontPlay($white, .9em);
        margin: 0 10px;
        box-shadow: $boxShadow;
      }

      &__price {
        @include fontExo($darkBlue, 1.4em);
        font-weight: 400;
      }

      &__symbol {
        color: $darkBlue;
        padding-top: 2px;
        font-weight: 700;
      }
    }

    &-btn {
      margin: 10px 0;
      width: 100%;
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
      @include flexAlign(center, flex-start);
      width: 90%;
      height: 36px;
      position: absolute;
      bottom: 0;

      &__stock {
        padding: 5px;
        background: $blue;
        border-radius: 3px;
        @include fontPlay($white, .9em);
        margin-right: 10px;
        box-shadow: $boxShadow;
      }

      &__discount {
        padding: 5px;
        background: $red;
        border-radius: 3px;
        @include fontPlay($white, .9em);
        box-shadow: $boxShadow;
      }
    }
  }
</style>
