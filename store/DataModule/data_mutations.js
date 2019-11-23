import * as mutation from '../MutationsType'

const mutations = {
  [mutation.ADD_POST](state, post) {
    state.posts.push(post)
  },

  [mutation.SET_ALL_POSTS](state, posts) {
    state.posts = posts
  },

  [mutation.SET_POST](state, post) {
    state.post = post
  },

  [mutation.SET_CONTENT](state, content) {
    state.content = content
  }
}

export default mutations