import * as action from '../ActionsType'
import * as mutation from '../MutationsType'
import * as api from '../../api'
import { errorHandler } from '@/utils'

const actions = {
  async [action.SAVE_CATEGORY]({ commit }, category) {
    try {
      const { data } = await api.createCategory(category)
      commit(mutation.SET_CATEGORY, data.category)
      return data
    } catch (err) {
      errorHandler(err)
    }
  },

  async [action.GET_ALL_CATEGORIES]({ commit }) {
    const { data: { categories } } = await api.fetchAllCategories()
    console.log(categories)
    commit(mutation.SET_ALL_CATEGORIES, categories)
    return categories
  }
}

export default actions