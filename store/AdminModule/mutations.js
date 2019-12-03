import * as mutation from '../MutationsType'

export default {
  [mutation.SET_CATEGORY](state, category) {
    state.categories.push(category)
  }
}



