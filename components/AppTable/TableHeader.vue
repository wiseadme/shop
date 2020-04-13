<template>
  <div class="table-header">
    <div class="table-header__check">
      <v-checkbox
        :is-checked="checkAll"
        @checked="$emit('check-all')"
      />
    </div>
    <template v-for="(col, i) in cols">
      <div
        v-if="col.checked"
        :key="col.key + i"
        :ref="i"
        :style="{width: col.width}"
        :class="['table-header__item']"
      >
        <span class="table-header__item-name">{{col.name}}</span>
        <i
          v-if="col.sortable"
          :class="['material-icons', 'table-header__item-filter', {active: col.sorted}]"
          @click="$emit('sort-column', col)"
        >filter_list</i>
        <span
          v-if="col.key !== 'number'"
          @mousedown="onMouseDown($event, col, i)"
          class="table-header__resize"
        ></span>
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
        resizeTarget: null,
        resizeCol: null,
        resizeOffset: 3,
        minWidth: 50,
        diff: null,
        pred: 0
      }
    },
    mounted() {

    },
    methods: {
      onMouseDown($event, col, i) {
        this.resizeTarget = i
        this.resizeCol = col
        document.addEventListener('mousemove', this.resizeAction)
        document.addEventListener('mouseup', this.removeListener)
        document.addEventListener('selectstart', this.disableSelection)
      },

      disableSelection(e) {
        e.preventDefault()
      },

      calculatePosition(e) {
        const width = this.$refs[this.resizeTarget][0].offsetWidth
        const offLeft = this.$refs[this.resizeTarget][0].offsetLeft
        if (!this.diff) {
          this.diff = e.clientX - (width + offLeft) - this.resizeOffset
        }
        return (e.clientX - offLeft) - this.diff
      },

      resizeAction(e) {
        const width = this.calculatePosition(e)
        if (width < this.minWidth) return
        this.resizeCol.width = width + 'px'
      },

      removeListener() {
        this.diff = null
        document.removeEventListener('mousemove', this.resizeAction)
        document.removeEventListener('mousemove', this.removeListener)
        document.removeEventListener('mouseup', this.removeListener)
        document.removeEventListener('selectstart', this.disableSelection)
      }
    }
  }
</script>

<style lang="scss">
  .table-header {
    min-width: calc(100vw - #{$asideWidth});
    height: 52px;
    display: inline-flex;
    justify-content: flex-start;
    position: sticky;
    background: #efefef;
    top: 0;
    z-index: 9;
    box-shadow: $boxShadowLite;

    &__resize {
      display: block;
      width: 5px;
      height: 100%;
      cursor: col-resize;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 20;
      border-radius: 3px;
      background: #848c91;
      opacity: .08;
    }

    &__item {
      position: relative;
      border-right: 1px solid #d5d5d5;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #efefef;
      overflow: hidden;

      &-name {
        @include fontExo($darkBlue, 13px);
        text-align: center;
        width: 180px;
      }

      &:nth-last-child {
        border: none
      }

      &-filter {
        position: absolute;
        right: 8px;
        color: $blue;
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
      border-right: .5px solid #d5d5d5;

      .v-checkbox__icon {
        color: $white;
      }
    }
  }

  .active {
    color: $orange;
  }
</style>
