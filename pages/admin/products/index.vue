<template>
  <div class="product-page">
    <div class="table-wrap">
      <app-table
        :rows="rows"
        :cols="cols"
        :create-items="createItems"
        :check-diffs="mixCheckBeforeLeave"
        @create="createNewProduct"
        @reload="reloadProducts"
        @update="updateProductRows"
        @delete="deleteProductRows"
        @differences="diffsHandler"
        @stop-diffs="mixCheckBeforeLeave = $event"
      />
    </div>
  </div>
</template>

<script>
  import AppTable from '@/components/AppTable'
  import productCols from '@/schemes/product-cols.json'
  import differences from '@/components/mixins/differences'

  export default {
    layout: 'admin',
    components: {
      AppTable,
    },
    mixins: [differences],

    data() {
      return {
        rows: null,
        cols: productCols,
        createItems: {
          category: null,
          unit: [
            { name: 'единица' },
            { name: 'килограмм' },
            { name: 'грамм' },
            { name: 'упаковка' }
          ],
          status: [
            { name: 'Новинка' },
            { name: 'Бестселлер' },
            { name: 'Уцененный' },
            { name: 'нет' }
          ],
          stock: [
            { name: '1 + 1' },
            { name: '2 + 1' },
            { name: '3 + 1' },
            { name: 'нет' }
          ]
        }
      }
    },

    created() {
      this.rows = this.products
      this.createItems.category = this.categories.map(it => {
        return new Object({ name: it.name, id: it._id, url: it.url })
      })

    },

    methods: {
      ...mapActions({
        createProduct: `DataModule/${action.CREATE_PRODUCT}`,
        fetchAllProducts: `DataModule/${action.GET_ALL_PRODUCTS}`,
        updateProducts: `DataModule/${action.UPDATE_PRODUCTS}`,
        deleteProducts: `DataModule/${action.DELETE_PRODUCTS}`
      }),

      updateProductRows(products) {
        this.updateProducts(products)
          .then(pr => this.reloadProducts())
          .catch(err => {
            this.$notify({
              type: 'danger',
              message: err
            })
          })
      },

      reloadProducts() {
        this.rows = null
        this.fetchAllProducts()
          .then(rows => setTimeout(() => this.rows = rows, 500))
          .then(data => {
            this.$notify({
              type: 'success',
              message: 'Данные обновлены'
            })
          })
      },

      createNewProduct(product) {
        this.createProduct(this.createFormData(product))
          .then(pr => this.reloadProducts())
          .catch(err => {
            this.$notify({
              type: 'danger',
              message: err
            })
          })
      },

      createFormData(obj) {
        const formData = new FormData()
        Object.keys(obj).forEach(key => {
          if (key === 'slides') {
            obj[key].forEach(it => {
              formData.append('images', it)
            })
            return formData.append(key, JSON.stringify(obj[key].map(it => it.name)))
          }
          formData.append(key, JSON.stringify(obj[key]))
        })
        return formData
      },

      deleteProductRows(checkedRows) {
        this.deleteProducts(checkedRows)
          .then(() => this.reloadProducts())
          .catch(err => {
            this.$notify({
              type: 'danger',
              message: err
            })
          })
      }
    },

    computed: {
      ...mapState({
        products: state => state.DataModule.products,
        categories: state => state.DataModule.categories,
      })
    }
  }
</script>

<style lang="scss" scoped>
  .product-page {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
  }

  .btn-block {
    display: flex;
    justify-content: space-between;
  }

  .table-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

</style>
