<template>
  <div class="table">
    <div class="table-bar">
      <ToolBar
        @reload="$emit('reload')"
        @format-table="showColsModal = !showColsModal"
        @show-all="showAllCols"
        @create="createRowItem"
        @edit-row="editCheckedRows"
        @save="saveChanges"
        @delete="deleteCheckedRows"
      />
    </div>
    <div class="table-inner">
      <TableHeader
        :cols="tableCols"
        :check-all="checkAllRows"
        @sort-column="sortColumn"
        @check-all="toggleCheckAllRows"
      />
      <TableBody
        v-if="rows && rows.length"
        :rows="tableRows"
        :cols="tableCols"
        :check-all="checkAllRows"
        @check-row="toggleCheckRow"
        @checked="toggleCheckRow"
      />
      <div v-show="!rows" class="preloader-wrap">
        <img class="preloader" src="/img/preloader.gif">
      </div>
    </div>

    <!-- Table modals is Here -->
    <transition name="fadeIn">
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
          <v-button @click="showColsModal = false" text="закрыть" type="warning"/>
        </div>
      </v-modal>
      <v-modal v-if="showAddModal">
        <h2 slot="header">Создать объект</h2>
        <div slot="body" class="modal-body-fields">
          <div class="field-wrap" v-for="col in colsOnCreate" :key="col.key">
            <v-input
              v-if="col.fieldType === 'input'"
              v-model="actualModal.add[col.key]"
              :label="col.name"
              :required="col.required"
              :placeholder="col.placeholder"
              clear-icon="info"
              @input="validateValue"
            />
            <v-select
              v-if="col.fieldType === 'select'"
              v-model="actualModal.add[col.key]"
              :label="col.name"
              :required="col.required"
              :placeholder="col.placeholder"
              :items="[0,1,2,3,4]"
              clear-icon="info"
              @selected="validateValue"
            />
          </div>
        </div>
        <div slot="footer" class="buttons-wrap">
          <v-button @click="createNewRowItem" text="создать" type="info"/>
          <v-button @click="showAddModal = false" text="отмена" type="warning"/>
        </div>
      </v-modal>
      <v-modal v-if="showWarningModal">
        <h2 slot="header">Внимание</h2>
        <div slot="body" class="warning-message">
          <span>Все несохраненные данные будут потеряны. Вы уверены что хотите продолжить?</span>
        </div>
        <div slot="footer" class="buttons-wrap">
          <v-button @click="discardAllDiffs" text="продолжить" type="success"/>
          <v-button @click="closeWarningModal" text="отмена" type="warning"/>
        </div>
      </v-modal>
      <v-modal v-if="showDangerModal" type="danger">
        <h2 slot="header">Внимание</h2>
        <div slot="body" class="warning-message">
          <span>Все несохраненные данные будут потеряны. Вы уверены что хотите продолжить?</span>
        </div>
        <div slot="footer" class="buttons-wrap">
          <v-button @click="discardAllDiffs" text="удалить" type="danger"/>
          <v-button @click="closeWarningModal" text="отмена" type="warning"/>
        </div>
      </v-modal>
    </transition>
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
      },
      checkDiffs: {
        type: Boolean
      }
    },

    data() {
      return {
        tableCols: null,
        tableRows: null,
        showPreloader: true,
        showColsModal: false,
        showAddModal: false,
        showWarningModal: false,
        showDangerModal: false,
        checkedRows: [],
        checkAllRows: false,
        discardChanges: false,
        rowsToDiscard: [],
        actualModal: {
          add: {}
        },
        filter: {
          __cols: [],
          __pretty: {}
        }
      }
    },

    created() {
      this.tableCols = this.cols
      this.tableRows = this.copyWithoutLink(this.rows)
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
        this.setGetOrRemoveLS('cols', { cols: this.tableCols, unchecked: this.filter.__cols }, true)
      },

      showAllCols() {
        this.filter.__cols = []
        this.setGetOrRemoveLS('cols', null)
        this.tableCols.forEach(it => it.checked = true)
      },

      sortColumn(col) {
        this.tableCols.forEach(it => {
          if (it !== col && it.sorted) it.sorted = false
        })
        this.$set(col, 'sorted', !col.sorted)
        this.tableRows.sort((a, b) => {
          if (a[col.key] > b[col.key] && col.sorted) return 1
          return -1
        })
      },

      getUncheckedColsFromLS() {
        const savedCols = this.setGetOrRemoveLS('cols')
        if (savedCols && savedCols.unchecked.length) {
          this.filter.__cols = savedCols.unchecked
          this.filterTableCols()
        }
      },

      toggleCheckRow(row) {
        if (this.checkDifferences(row) && !this.discardChanges) {
          this.rowsToDiscard.push(row)
          return this.showWarningModal = true
        }
        if (this.checkAllRows) {
          this.toggleCheckAllRows()
        }
        this.$set(row, 'checked', !row.checked)
        if (row.edit) {
          row.edit = false
        }
        if (row.checked && !this.discardChanges) {
          this.checkedRows.push(row)
        } else {
          let ind = this.checkedRows.findIndex(it => it._id === row._id)
          this.checkedRows.splice(ind, 1)
        }
      },

      toggleCheckAllRows() {
        if (this.checkDifferences() && !this.discardChanges) {
          return this.showWarningModal = true
        }
        this.checkAllRows = !this.checkAllRows
        this.checkedRows = []
        this.tableRows.forEach(it => {
          this.$set(it, 'checked', this.checkAllRows)
          if (this.checkAllRows) {
            this.checkedRows.push(it)
          }
        })
      },

      checkDifferences(row = null) {
        let isDiff = []
        let diffs = []
        row ? diffs[0] = row : diffs = this.checkedRows.filter(it => it.changed)
        diffs.forEach(ed => {
          let diffRowKeys = this.extractDiffKeys(ed)
          diffRowKeys ? isDiff.push(diffRowKeys) : false
        })
        if (this.checkDiffs) {
          this.$emit('differences', !!isDiff.length)
        }
        return isDiff.length
      },

      discardAllDiffs() {
        this.discardChanges = true
        this.rowsToDiscard.forEach((row, i) => {
          let found = this.rows.find(it => it._id === row._id)
          Object.keys(found).forEach(key => {
            row[key] = found[key]
          })
          this.rowsToDiscard.splice(i, 1)
          this.toggleCheckRow(row)
        })
        if (this.checkDiffs) {
          this.$emit('differences', false)
        }
        setTimeout(() => {
          this.discardChanges = false
          this.showWarningModal = false
        }, 0)
      },

      extractDiffKeys(row) {
        let flag = false
        let diffObj = {}
        let found = this.rows.find(it => it._id === row._id)
        Object.keys(found).forEach(key => {
          if (row[key] !== found[key]) {
            diffObj[key] = row[key]
            flag = true
          }
        })
        flag ? diffObj._id = row._id : diffObj = false
        return diffObj
      },

      saveChanges() {
        if (!this.checkDifferences()) return
        const rowsDiffs = []
        this.checkedRows.filter(it => it.changed).forEach(row => {
          let ext = this.extractDiffKeys(row)
          ext ? rowsDiffs.push(ext) : false
        })
        this.checkedRows = []
        this.$emit('update', rowsDiffs)
        if (this.checkDiffs) {
          this.$emit('differences', false)
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

      deleteCheckedRows() {
        this.$emit('delete', this.checkedRows)
      },

      validateValue(e) {
        console.log(e)
      },

      editCheckedRows() {
        this.checkedRows.forEach(row => {
          this.$set(row, 'edit', !row.edit)
        })
      },

      createRowItem() {
        this.showAddModal = true
        Object.keys(this.colsOnCreate).forEach(col => {
          if (col && col.key) {
            this.$set(this.actualModal.add, col.key, '')
          }
        })
      },

      createNewRowItem() {
        this.$emit('create', this.actualModal.add)
        this.showAddModal = false
      },

      closeWarningModal() {
        this.showWarningModal = false
        this.$emit('stop-diffs', false)
      },

      copyWithoutLink(obj) {
        const rows = JSON.stringify(obj)
        return JSON.parse(rows)
      }
    },

    beforeDestroy() {
      this.$off('show-all', this.showAllCols)
      this.$off('create', this.createRowItem)
      this.$off('edit-row', this.editCheckedRows)
      this.$off('save', this.saveChanges)
      this.$off('delete', this.deleteCheckedRows)
      this.$off('sort-column', this.sortColumn)
      this.$off('check-all', this.toggleCheckAllRows)
      this.$off('check-row', this.toggleCheckRow)
      this.$off('checked', this.toggleCheckRow)
    },

    computed: {
      colsOnCreate() {
        return this.tableCols.filter(it => it.useOnCreate)
      }
    },

    watch: {
      rows(to) {
        this.tableRows = this.copyWithoutLink(to)
      },

      checkDiffs(to) {
        if (to && this.checkDifferences()) {
          this.showWarningModal = true
        }
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
    position: sticky;
    left: 0;
  }

  .preloader {
    width: 75px;
  }

  .check-wrap {
    display: block;
    margin: 15px 0;
  }

  .buttons-wrap {
    @include flexAlign(center, space-between)
  }

  .field-wrap {
    margin: 20px 0;
  }

  .modal-body-fields {

  }
</style>
