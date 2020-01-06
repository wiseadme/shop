import * as action from '../ActionsType'
import * as mutation from '../MutationsType'
import * as api from '../../api'
import { errorHandler } from '@/utils'

const actions = {
  async [action.SAVE_CATEGORY]({}, category) {
    try {
      const { data } = await api.createCategory(category)
      return data
    } catch (err) {
      errorHandler(err)
      return Promise.reject(err)
    }
  },

  async [action.GET_ALL_CATEGORIES]({ commit }) {
    const { data: { categories } } = await api.fetchAllCategories()
    commit(mutation.SET_ALL_CATEGORIES, categories)
    return categories
  },

  async [action.UPDATE_CATEGORIES]({}, categories) {
    const { data } = await api.updateCategories(categories)
    return data
  },

  async [action.DELETE_CATEGORIES]({}, categories) {
    const { data } = await api.deleteCategories(categories)
    return data
  },

  async [action.CREATE_PRODUCT]({}, product) {
    const { data } = await api.createProduct(product)
    return data
  },

  async [action.GET_ALL_PRODUCTS]({ commit }) {
    const { data: { products } } = await api.fetchAllProducts()
    commit(mutation.SET_ALL_PRODUCTS, products)
    return products
  },

  async [action.GET_PRODUCT_ITEM]({}, url) {
    try {
      const data = await api.fetchProductItem(url)
      return data.data
    } catch (err) {
      return Promise.reject('Ошибка сервера')
    }
  }
}

export default actions
