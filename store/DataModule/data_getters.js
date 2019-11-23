const getters = {
  getTravelsInfo(state) {
    return state.travelsInfo
  },

  getPost(state) {
    return state.post
  },

  getAllPosts(state) {
    return state.posts
  },

  getContent(state) {
    return state.content
  }
}

export default getters