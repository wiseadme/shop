import * as action from '../ActionsType'
import * as mutation from '../MutationsType'
import * as api from '../../api'

const actions = {
  async [action.SAVE_CATEGORY]({}, category) {
    try {
      const { data } = await api.createCategory(category)
      return data
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  },

  async [action.GET_ALL_CATEGORIES]({ commit }) {
    try {
      const { data: { categories } } = await api.fetchAllCategories()
      commit(mutation.SET_ALL_CATEGORIES, categories)
      return categories
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  },

  async [action.UPDATE_CATEGORIES]({}, categories) {
    try {
      const { data } = await api.updateCategories(categories)
      return data
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  },

  async [action.DELETE_CATEGORIES]({}, categories) {

    try {
      const { data } = await api.deleteCategories(categories)
      return data
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  },

  async [action.CREATE_PRODUCT]({}, product) {
    try {
      const { data } = await api.createProduct(product)
      return data
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  },

  async [action.GET_ALL_PRODUCTS]({ commit }) {
    try {
      const { data: { products } } = await api.fetchAllProducts()
      commit(mutation.SET_ALL_PRODUCTS, products)
      return products
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  },

  async [action.GET_PRODUCT_ITEM]({}, url) {
    try {
      const data = await api.fetchProductItem(url)
      return data.data
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  }
  ,

  async [action.UPDATE_PRODUCTS]({}, products) {
    try {
      const { data: { items } } = await api.updateProducts(products)
      return items
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  },

  async [action.DELETE_PRODUCTS]({}, products) {
    try {
      await api.deleteProducts(products)
    } catch (err) {
      return Promise.reject('Ошибка сервера ' + err)
    }
  }
}

export default actions
