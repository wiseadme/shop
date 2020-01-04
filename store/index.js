const state = () => {

}

const getters = {}

const mutations = {}

const actions = {
  async nuxtServerInit({ dispatch }) {
    await Promise.all([
      dispatch('AuthModule/AUTO_LOGIN'),
      dispatch('AdminModule/GET_ALL_CATEGORIES'),
      dispatch('AdminModule/GET_ALL_PRODUCTS')
    ])
  }
}

export default { state, getters, mutations, actions }