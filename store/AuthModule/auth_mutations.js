import * as mutation from '../MutationsType'

const mutations = {
  [mutation.CHANGE_LOGIN_STATE](state, flag) {
    state.isAuthenticated = flag
  },

  [mutation.SET_TOKEN](state, token) {
    state.token = token
  },

  [mutation.SET_USER](state, user) {
    state.user = user
  }
}

export default mutations
