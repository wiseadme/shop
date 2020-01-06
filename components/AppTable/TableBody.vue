<template>
  <div class="table-body">
    <div v-for="(row, i) in rows" :key="row.name + row._id">
      <div
        :class="['table-body__row', {checked: row.checked}]"
        @dblclick="checkRow(row)"
      >
        <div :class="['table-body__row-check', {'edit-mode': row.edit}]">
          <v-checkbox @checked="$emit('checked', row)" :is-checked="row.checked || checkAll"/>
        </div>
        <template v-for="(col, j) of cols">
          <div
            v-if="col.checked && !row.edit"
            :key="col.name + j"
            :class="['table-body__cell']"
            :style="{width: col.width}"
            :data-col="col.name"
          >
            <span class="table-body__cell-text" v-if="col.key === 'number'">{{ i += 1 }}</span>
            <span class="table-body__cell-text" v-else>
              {{row[col.key] ? row[col.key] === true ? '+': row[col.key] :
              row[col.key] === false || !row[col.key] && row[col.key] !== 0 ? '-' : row[col.key] | extractValue}}
            </span>
          </div>
          <div
            v-if="col.checked && row.edit"
            :key="col.name + j"
            :class="['table-body__cell', 'edit-mode']"
            :style="{width: col.width}"
            :data-col="col.name"
          >
            <span v-if="col.key === 'number'">{{ i += 1 }}</span>
            <input
              v-if="col.own"
              class="table-body__cell-edit"
              type="text"
              :value="row[col.key] | extractValue"
              @blur="blurHandler($event, row, col.key)"
              @focus="row[col.key].name ? $set(row[col.key], 'sub', true) : false"
              @input="inputHandler($event, row[col.key])"
            >
            <template v-if="row[col.key] && row[col.key].name && row[col.key].sub">
              <div class="selects-wrap">
                <span
                  v-for="it in createItems[col.key]"
                  :key="it.name"
                  class="selects-wrap__item"
                  @mousedown="selectItem(row, col.key, it)"
                >
                  {{it.name}}
                </span>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cols: {
        type: Object,
        required: true
      },
      rows: {
        type: Array
      },
      checkAll: {
        type: Boolean
      },
      createItems: {
        type: Object
      }
    },

    data() {
      return {
        rowsOnTable: null
      }
    },

    filters: {
      extractValue(val) {
        const type = Object.prototype.toString.call(val).slice(8, -1)
        if (type === 'Object') {
          return val.name
        }
        return val
      }
    },

    methods: {
      checkRow(row) {
        this.$emit('check-row', row)
      },

      blurHandler($event, row, key) {
        if (this.checkType(row[key]) === 'Object') {
          setTimeout(() => this.$set(row[key], 'sub', false), 0)
          row[key].name = $event.target.value
        } else {
          row[key] = $event.target.value
        }
        row.changed = true
      },

      inputHandler(ev, val) {
        if (this.checkType(val) === 'Object') {
          ev.target.value = val.name
        }
      },

      selectItem(row, key, newValue) {
        this.$set(row, key, newValue)
      },

      checkType(forCheck) {
        return Object.prototype.toString.call(forCheck).slice(8, -1)
      }
    },

    computed: {}
  }
</script>

<style lang="scss">
  .table-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__row {
      display: inline-flex;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 1px solid #ecedf1;
      transition: background .2s;
      height: 52px;
      cursor: pointer;

      &:hover {
        background: $grey;
      }

      &:hover .table-body__cell {
        color: $white;
      }

      &:hover .v-checkbox__icon {
        color: $white;
      }

      &-check {
        width: 40px;
        height: 100%;
        @include flexAlign(center, center);
        border-right: 1px solid #ecedf1;
      }
    }

    &__cell {
      display: inline-flex;
      align-items: center;
      position: relative;
      padding: 0 5px;
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: color .2s;
      border-right: 1px solid #ecedf1;
      @include fontExo($darkBlue, 14px);

      &-text {
        width: 100%;
        overflow: hidden;
      }

      &:first-child {
        justify-content: center;
      }

      &-edit {
        width: 100%;
        background: transparent;
        border-bottom: 1px solid $white;
        @include fontExo($white, 1em);
      }
    }
  }

  .edit-mode {
    background: $blueLight;
    color: $white;
  }

  .checked {
    background: $grey;
  }

  .selects-wrap {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    @include flexAlign(center, center, column);
    background: $blueLight;
    box-shadow: $boxShadow;

    &__item {
      width: 100%;
      padding: 8px;

      &:hover {
        background: $darkBlue;
      }
    }
  }
</style>
