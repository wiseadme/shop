<template>
  <div class="table-header">
    <div class="table-header__check">
      <v-checkbox
        :is-checked="checkAll"
        @checked="$emit('check-all')"
      />
    </div>
    <template v-for="(col, i) of cols">
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
        <span ref="resize" @mousedown="onMouseDown($event, col)" class="table-header__resize"></span>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      cols: {
        type: Object,
      },
      checkAll: {
        type: Boolean
      }
    },

    data() {
      return {
        clientX: null,
        clientY: null,
        pred: 0
      }
    },
    mounted() {

    },
    methods: {
      onMouseDown($event, col) {
        document.addEventListener('mousemove', this.resizeCol.bind(this, $event, col))
        document.addEventListener('mouseup', this.onMouseUp)
      },

      onMouseUp() {
        document.removeEventListener('mousemove', this.resizeCol)
      },

      resizeCol(e, col) {
        this.clientX < e.clientX ? this.pred = -1 : this.pred = 1
        col.width = (parseFloat(col.width) + this.pred) + 'px'
        this.clientX = e.clientX
      }
    }
  }
</script>

<style lang="scss">
  .table-header {
    min-width: calc(100vw - 60px);
    height: 52px;
    display: inline-flex;
    justify-content: flex-start;
    position: sticky;
    background: $darkGrey;
    top: 0;
    z-index: 9;

    &__resize {
      display: block;
      width: 5px;
      height: 100%;
      cursor: col-resize;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 20;
    }

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
