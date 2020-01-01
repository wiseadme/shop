<template>
  <div class="table-header">
    <div class="table-header__check">
      <v-checkbox/>
    </div>
    <template v-for="(col, i) in cols">
      <div
        v-if="col.checked"
        :key="col.key + i"
        :style="{width: col.width}"
        :class="['table-header__item']"
      >
        <span class="table-header__item-name">{{col.name}}</span>
        <i
          v-if="col.sortable"
          :class="['material-icons', 'table-header__item-filter', {active: col.sorted}]"
          @click="$emit('sort-column', col)"
        >filter_list</i>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      cols: {
        type: Array,
      },
    },

    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  .table-header {
    /*width: 100%;*/
    min-width: calc(100vw - 60px);
    height: 52px;
    display: inline-flex;
    justify-content: flex-start;
    position: sticky;
    background: $darkGrey;
    top: 0;

    &__item {
      position: relative;
      border-right: 1px solid $white;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $darkGrey;

      &-name {
        @include fontExo($white, 15px);
        text-align: center;
        width: 180px;
      }

      &:nth-last-child {
        border: none
      }

      &-filter {
        position: absolute;
        right: 5px;
        color: $white;
        cursor: pointer;
      }

      .material-icons {
        font-size: 16px;
      }
    }

    &__check {
      width: 40px;
      height: 100%;
      @include flexAlign(center, center);
      border-right: 1px solid #ecedf1;

      .v-checkbox__icon {
        color: $white;
      }
    }
  }

  .active {
    color: $orange;
  }
</style>
