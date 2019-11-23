const getters = {
  isAuthenticated(state) {
    return Boolean(state.token)
  },

  getToken(state) {
    return state.token
  }
}

export default getters