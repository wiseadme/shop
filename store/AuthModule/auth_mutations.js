import * as mutation from '../MutationsType'

const mutations = {
  [mutation.CHANGE_LOGIN_STATE](state) {
    state.isAuthenticated = !state.isAuthenticated
  },

  [mutation.SET_TOKEN](state, token) {
    state.token = token
  },

  [mutation.SET_USER](state, user) {
    state.user = user
  },

  [mutation.SET_ERROR](state, error) {
    state.error = error
  },

  [mutation.CLEAR_ERROR](state) {
    state.error = null
  },

  [mutation.SET_RESPONSE](state, res) {
    state.response = res
  }
}

export default mutations