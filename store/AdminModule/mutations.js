import * as mutation from '../MutationsType'

export default {
  [mutation.SET_CATEGORY](state, category) {
    state.categories.push(category)
  },

  [mutation.SET_ALL_CATEGORIES](state, categories) {
    state.allCategories = categories
  }
}



