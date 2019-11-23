const getters = {
  isAuthenticated(state) {
    return Boolean(state.token)
  },

  getResponse(state) {
    return state.response
  },

  getUser(state) {
    return state.user
  },

  getToken(state) {
    return state.token
  }
}

export default getters