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
        :cols="table.cols"
        :check-all="checkAllRows"
        @sort-column="sortColumn"
        @check-all="toggleCheckAllRows"
      />
      <TableBody
        v-if="rows && rows.length"
        :rows="tableRows"
        :cols="table.cols"
        :check-all="checkAllRows"
        :create-items="createItems"
        @check-row="toggleCheckRow"
        @checked="toggleCheckRow"
      />
      <div v-show="!rows" class="preloader-wrap">
        <img class="preloader" src="/img/preloader.gif">
      </div>
    </div>
    <!-- Table modals is here -->
    <transition name="fadeIn">
      <v-modal v-if="showColsModal">
        <h2 slot="header">Фильтрация колонок</h2>
        <div slot="body" v-for="col of table.cols" :key="col.name">
        <span class="check-wrap">
          <v-checkbox
            :label="col.name"
            :item="col"
            :isChecked="col.checked"
            @checked="checkCols"
          />
        </span>
        </div>
        <div slot="footer" class="buttons-wrap">
          <div class="form-btn">
            <v-button @click="filterTableCols" text="применить" type="info"/>
          </div>
          <div class="form-btn">
            <v-button @click="showColsModal = false" text="закрыть" type="warning"/>
          </div>
        </div>
      </v-modal>
      <v-modal v-if="showAddModal">
        <h2 slot="header">Создать объект</h2>
        <div slot="body" :class="['modal-body-fields', `modal-${currentTable}`]">
          <div
            v-for="col of colsOnCreate"
            :key="col.key"
            :class="['field-wrap', `field-${currentTable}`,
            {'loader-wrap': col.fieldType === 'file', 'area-wrap': col.fieldType === 'area'}]"
          >
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
              :items="createItems[col.key]"
              clear-icon="info"
              @selected="validateValue"
            />
            <v-file-loader
              v-if="col.fieldType === 'file'"
              v-model="actualModal.add[col.key]"
              label="Выберите изображения (до 12 штук)"
              :required="col.required"
              :placeholder="col.placeholder"
              @input="validateValue"
            />
            <v-area
              v-if="col.fieldType === 'area'"
              :placeholder="col.placeholder"
              v-model="actualModal.add[col.key]"
            />
          </div>
        </div>
        <div slot="footer" class="buttons-wrap">
          <div class="form-btn">
            <v-button @click="createNewRowItem" text="создать" type="info"/>
          </div>
          <div class="form-btn">
            <v-button @click="showAddModal = false" text="отмена" type="warning"/>
          </div>
        </div>
      </v-modal>
      <v-modal v-if="showWarningModal || showDangerModal">
        <h2 slot="header">Внимание</h2>
        <div slot="body" class="warning-message">
          <div class="msg-wrap">
            <span>Все несохраненные данные будут потеряны. Вы уверены что хотите продолжить?</span>
          </div>
        </div>
        <div slot="footer" class="buttons-wrap">
          <div class="form-btn">
            <v-button @click="discardAllDiffs" text="продолжить" type="success"/>
          </div>
          <div class="form-btn">
            <v-button @click="closeWarningModal" text="отмена" type="warning"/>
          </div>
        </div>
      </v-modal>
    </transition>
  </div>
</template>

<script>
  import TableHeader from './TableHeader'
  import TableBody from './TableBody'
  import ToolBar from './ToolBar'
  import { lStorage } from '@/utils'

  export default {
    name: 'DataTable',
    components: {
      TableHeader,
      TableBody,
      ToolBar,
    },
    props: {
      cols: {
        type: Object,
      },
      rows: {
        type: Array
      },
      createItems: {
        type: Object,
      },
      checkDiffs: {
        type: Boolean
      }
    },

    data() {
      return {
        tableRows: null,
        showColsModal: false,
        showAddModal: false,
        showWarningModal: false,
        showDangerModal: false,
        checkedCols: {},
        checkedRows: [],
        checkAllRows: false,
        discardChanges: false,
        rowsToDiscard: [],
        actualModal: {
          add: {}
        },
        table: {
          cols: {},
          filter: {},
          sort: {}
        }
      }
    },

    created() {
      if (process.browser && !lStorage(this.currentTable)) {
        this.table.cols = this.cols
        lStorage(this.currentTable, this.table)
      } else {
        this.table.cols = this.getCols()
      }
      this.tableRows = this.copyWithoutLink(this.rows)
    },

    methods: {
      checkCols(col) {
        col = this.copyWithoutLink(col)
        col.checked = !col.checked
        this.checkedCols[col.key] = col
      },

      filterTableCols() {
        Object.keys(this.checkedCols).forEach(key => {
          this.table.cols[key].checked = this.checkedCols[key].checked
        })
        this.checkedCols = {}
        lStorage(this.currentTable, this.table)
      },

      showAllCols() {
        Object.keys(this.table.cols).forEach(col => {
          this.table.cols[col].checked = true
        })
        lStorage(this.currentTable, null, true)
      },

      getCols() {
        if (process.browser && lStorage(this.currentTable)) {
          return lStorage(this.currentTable).cols
        }
        return this.cols
      },

      sortColumn(col) {
        Object.keys(this.table.cols).forEach(key => {
          if (this.table.cols[key].key !== col.key) {
            this.$set(this.table.cols[key], 'sorted', false)
          }
        })
        this.$set(col, 'sorted', !col.sorted)
        this.tableRows.sort((a, b) => {
          if (Number(a[col.key]) && Number(b[col.key])) {
            if (col.sorted) {
              return a[col.key] - b[col.key]
            }
          }
          if (a[col.key] > b[col.key] && col.sorted) return 1
          return -1
        })
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
          this.checkedRows = this.checkedRows.filter(it => it._id !== row._id)
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
            row[key] = this.copyWithoutLink(found[key])
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
        })
      },

      extractDiffKeys(row) {
        let flag = false
        let diffObj = {}
        let found = this.rows.find(it => it._id === row._id)
        Object.keys(found).forEach(key => {
          if (!this.compareStringify(row[key], found[key])) {
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
          row.checked = false
          row.edit = false
          row.changed = false
        })
        this.checkedRows = []
        this.$emit('update', rowsDiffs)
        if (this.checkDiffs) {
          this.$emit('differences', false)
        }
      },

      deleteCheckedRows() {
        this.$emit('delete', this.checkedRows)
      },

      validateValue(e) {
        // console.log(this.actualModal.add)
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
        return JSON.parse(JSON.stringify(obj))
      },

      compareStringify(val1, val2) {
        return JSON.stringify(val1) === JSON.stringify(val2)
      },
    },

    beforeDestroy() {

    },

    computed: {
      colsOnCreate() {
        const cols = {}
        Object.keys(this.table.cols).forEach(col => {
          if (this.table.cols[col].useOnCreate) {
            cols[col] = this.table.cols[col]
          }
        })
        return cols
      },

      currentTable() {
        return `table-${ this.$route.path.slice(7) }`
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
  $toolbarHeight: 60px;

  .table {
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-inner {
      width: calc(100vw - #{$asideWidth});
      height: calc(100vh - (#{$headerHeight + $toolbarHeight}));
      overflow: auto;
    }
  }

  .preloader-wrap {
    @include flexAlign(center, center);
    width: 100%;
    height: calc(100% - 52px);
    position: sticky;
    left: 0;
  }

  .preloader {
    width: 75px;
  }

  .check-wrap {
    display: block;
    margin: 15px;
  }

  .form-btn {
    margin: 0 10px;
  }

  .buttons-wrap {
    @include flexAlign(center, center)
  }

  .field-wrap {
    margin: 10px 0;
    padding: 0 15px;
  }

  .modal-table-products {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    max-height: 60vh;
    padding: 5px;
    overflow-y: auto;
  }

  .field-table-products {
    width: 33%;
  }

  .loader-wrap {
    width: 100%;
  }

  .msg-wrap {
    padding: 15px;
  }

  .area-wrap {
    width: 100%;
  }
</style>
