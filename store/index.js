const state = () => {

}

const getters = {}

const mutations = {}

const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('AuthModule/AUTO_LOGIN')
    await dispatch('AdminModule/GET_ALL_CATEGORIES')
  }
}

export default { state, getters, mutations, actions }