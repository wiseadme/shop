<template>
  <div class="table-header">
    <div
      v-for="col in cols"
      :key="col.code"
      :class="['table-header__item',{'small-item': col.small}]"
    >
      <span class="table-header__item-name">{{col.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cols: {
        type: Array,
      },
    }
  }
</script>

<style lang="scss">
  .table-header {
    width: 100%;
    height: 52px;
    display: flex;
    background: #7F828B;

    &__item {
      border-right: 1px solid $white;
      padding: 5px;
      width: 175px;
      display: flex;
      align-items: center;
      justify-content: center;

      &-name {
        @include fontPlay($white, 14px);
        text-align: center;
      }
    }
  }

  .small-item{
    width: 50px;
  }
</style>