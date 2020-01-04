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
          ]
        }
      }
    },

    created() {
      this.rows = this.products
      this.createItems.category = this.categories.map(it => new Object({ name: it.name, id: it._id }))
    },

    methods: {
      ...mapActions({
        createProduct: `AdminModule/${action.CREATE_PRODUCT}`,
        fetchAllProducts: `AdminModule/${action.GET_ALL_PRODUCTS}`
      }),

      reloadProducts() {
        this.rows = null
        this.fetchAllProducts()
          .then(rows => this.rows = rows)
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
              message: 'Ошибка сервера. Повторите операцию позже'
            })
          })
      },

      createFormData(obj) {
        const { name, head, text, images, quantity, price, category } = obj
        const formData = new FormData()
        formData.append('name', name)
        formData.append('head', head)
        formData.append('text', text)
        formData.append('images', images)
        formData.append('quantity', quantity)
        formData.append('price', price)
        formData.append('category', category.id)
        return formData
      }
    },

    computed: {
      ...mapState({
        products: state => state.AdminModule.products,
        categories: state => state.AdminModule.categories,
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
