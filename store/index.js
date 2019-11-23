const state = () => {

}

const getters = {

}

const mutations = {

}

const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('AuthModule/AUTO_LOGIN')
    // await dispatch('DataModule/FETCH_POSTS')
  }
}

export default { state, getters, mutations, actions }