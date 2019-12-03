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
  }
}

export default actions