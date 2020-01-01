<template>
  <div class="table-body">
    <template v-for="(row, i) in rows">
      <div
        :key="row.name"
        :class="['table-body__row', {checked: row.checked}]"
        @dblclick="checkRow(row)"
      >
        <div class="table-body__row-check">
          <v-checkbox @checked="$emit('checked', row)" :is-checked="row.checked || checkAll"/>
        </div>
        <template v-for="(col, j) in cols">
          <div
            v-if="col.checked && !row.edit"
            :key="col.name + j"
            :class="['table-body__cell']"
            :style="{width: col.width}"
            :data-col="col.name"
          >
            <span v-if="col.key === '№'">{{ i += 1 }}</span>
            <span v-else>
              {{row[col.key] ? row[col.key] === true ? '+': row[col.key] : row[col.key] === false || !row[col.key] ? '-' : ''}}
            </span>
          </div>
          <div v-if="col.checked && row.edit"
            :key="col.name + j"
            :class="['table-body__cell']"
            :style="{width: col.width}"
            :data-col="col.name"
          >
            <span v-if="col.key === '№'">{{ i += 1 }}</span>
            <input v-else type="text" :value="row[col.key]">
<!--            <span>-->
<!--              {{row[col.key] ? row[col.key] === true ? '+': row[col.key] : row[col.key] === false || !row[col.key] ? '-' : ''}}-->
<!--            </span>-->
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
        type: Array,
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
      }
    }
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
    }
  }
  .checked {
    background: $grey;
  }
</style>
