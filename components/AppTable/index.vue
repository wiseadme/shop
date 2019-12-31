<template>
  <div class="table">
    <div class="table-bar">
      <ToolBar
        @reload="$emit('reload')"
        @format-table="showColsModal = !showColsModal"
        @show-all="showAllCols"
      />
    </div>
    <div class="table-inner">
      <TableHeader
        :cols="tableCols"
        @sort-column="sortColumn"
      />
      <TableBody
        v-if="rows"
        :rows="rows"
        :cols="tableCols"
      />
      <div v-show="!rows" class="preloader-wrap">
        <img class="preloader" src="/img/preloader.gif">
      </div>
    </div>

    <!-- Table modals is Here -->

    <v-modal v-if="showColsModal">
      <h2 slot="header">Фильтрация колонок</h2>
      <div slot="body" v-for="col in cols" :key="col.name">
        <span class="check-wrap">
          <v-checkbox
            :label="col.name"
            :item="col"
            :isChecked="col.checked"
            @checked="addInFilteredCols"
          />
        </span>
      </div>
      <div slot="footer" class="buttons-wrap">
        <v-button @click="filterTableCols" text="применить" type="info"/>
        <v-button @click="cancel" text="закрыть" type="warning"/>
      </div>
    </v-modal>
  </div>
</template>

<script>
  import TableHeader from './TableHeader'
  import TableBody from './TableBody'
  import ToolBar from './ToolBar'

  export default {
    name: 'DataTable',
    components: {
      TableHeader,
      TableBody,
      ToolBar,
    },
    props: {
      cols: {
        type: Array,
      },
      rows: {
        type: Array
      }
    },

    data() {
      return {
        tableCols: null,
        tableRows: null,
        showPreloader: true,
        showColsModal: false,
        filter: {
          __cols: [],
        }
      }
    },

    created() {
      this.tableCols = this.cols
      if (process.browser) {
        this.getUncheckedColsFromLS()
      }
    },

    methods: {
      addInFilteredCols(col) {
        let same = this.filter.__cols.findIndex(it => it.item.name === col.item.name)
        if (same >= 0) {
          let found = this.tableCols.find(it => it.name === col.item.name)
          if (found.checked === col.checked) {
            return this.filter.__cols.splice(same, 1)
          }
          return this.filter.__cols.splice(same, 1, col)
        } else {
          this.filter.__cols.push(col)
        }
      },

      filterTableCols() {
        let checkedCols = []
        this.filter.__cols.forEach(col => {
          checkedCols.push(col)
          let ind = this.tableCols.findIndex(t => t.name === col.item.name)
          this.tableCols[ind].checked = col.checked
          if (col.checked) {
            checkedCols.splice(checkedCols.indexOf(col), 1)
          }
        })
        this.filter.__cols = checkedCols
        this.setGetOrRemoveLS('unchecked-cols', this.filter.__cols, true)
      },

      showAllCols() {
        this.filter.__cols = []
        this.setGetOrRemoveLS('unchecked-cols', null)
        this.tableCols.forEach(it => it.checked = true)
      },

      sortColumn(col) {
        this.tableCols.forEach(it => {
          if (it !== col && it.sorted) it.sorted = false
        })
        this.$set(col, 'sorted', !col.sorted)
        this.rows.sort((a, b) => {
          if (a[col.key] > b[col.key] && col.sorted) return 1
          return -1
        })
      },

      getUncheckedColsFromLS() {
        const savedCols = this.setGetOrRemoveLS('unchecked-cols')
        if (savedCols && savedCols.length) {
          this.filter.__cols = savedCols
          this.filterTableCols()
        }
      },

      setGetOrRemoveLS(name, item = [], flag = false) {
        if (flag && item) {
          return localStorage.setItem(name, JSON.stringify(item))
        }
        if (item === null) {
          localStorage.removeItem(name)
        }
        return JSON.parse(localStorage.getItem(name))
      },

      cancel() {
        this.showColsModal = false
      }
    }
  }
</script>

<style lang="scss">
  .table {
    margin: 0 auto;
    width: 100%;
    height: 100%;

    &-inner {
      width: 100%;
      height: calc(100% - 60px);
      overflow: auto;
    }
  }

  .preloader-wrap {
    width: 100%;
    height: calc(100% - 60px);
    @include flexAlign(center, center);
  }

  .preloader {
    width: 75px;
  }

  .check-wrap {
    display: block;
    margin: 5px 0;
  }

  .buttons-wrap {
    @include flexAlign(center, space-between)
  }
</style>
