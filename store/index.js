const state = () => {

}

const getters = {}

const mutations = {}

const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('AuthModule/AUTO_LOGIN')
  }
}

export default { state, getters, mutations, actions }