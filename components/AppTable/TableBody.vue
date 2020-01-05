<template>
  <div class="table-body">
    <template v-for="(row, i) in rows">
      <div
        :key="row.name + row._id"
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
            <span v-if="col.key === 'number'">{{ i += 1 }}</span>
            <span v-else-if="checkType(row[col.key]) === 'Object'"
                  :data-id="row[col.key]._id">{{ row[col.key].name }}</span>
            <span v-else>
              {{row[col.key] ? row[col.key] === true ? '+': row[col.key] :
              row[col.key] === false || !row[col.key] && row[col.key] !== 0 ? '-' : row[col.key]}}
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
              :value="checkType(row[col.key]) === 'Object' ? row[col.key].name : row[col.key]"
              @blur="blurHandler($event, row, {prop: col.key, sub: 'name'})"
            >
          </div>
        </template>
      </div>
    </template>
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
    },

    data() {
      return {
        rowsOnTable: null
      }
    },

    methods: {
      checkRow(row) {
        this.$emit('check-row', row)
      },

      blurHandler($event, row, key) {
        if (this.checkType(row[key] === 'Object')) {
          row[key.prop][key.sub] = $event.target.value
        } else {
          row[key] = $event.target.value
        }
        row.changed = true
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
      padding: 0 5px;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: color .2s;
      border-right: 1px solid #ecedf1;
      @include fontExo($darkBlue, 14px);

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
</style>
