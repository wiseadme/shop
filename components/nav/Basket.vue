<template>
  <router-link to="/basket" class="basket-block">
    <span class="basket-block__img"></span>
    <div ref="inBasket" class="basket-block__items">{{basketValue}}</div>
    <span class="basket-block__desc">Корзина</span>
  </router-link>
</template>
<script>

  export default {

    data() {
      return {
        basketValue: 0,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .basket-block {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    text-decoration: none;
    line-height: 1.6em;
    @include font($darkBlue, .8em);
  }

  .basket-block__img {
    display: block;
    width: 15px;
    height: 15px;
    background-image: url("../../assets/img/shopping-basket.svg");
    background-size: cover;
  }

  .basket-block__items {
    position: relative;
    display: block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-weight: 600;
    color: $white;
    text-align: center;
    background-color: $darkBlue;
    border-radius: 50%;
  }

  .basket-block__desc {
    width: auto;
    text-align: center;
  }
</style>
