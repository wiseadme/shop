import * as mutation from '../MutationsType'

export default {
  [mutation.SET_ALL_CATEGORIES](state, categories) {
    state.categories = categories
  },

  [mutation.SET_ALL_PRODUCTS](state, products) {
    state.products = products
  }
}



