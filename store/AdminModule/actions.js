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
  }
}

export default actions