import Cookie from 'cookie'
import Cookies from 'js-cookie'
import { setOrRemoveFromLS, isJWTValid } from '@/utils'
import * as api from '@/api'
import * as action from '../ActionsType'
import * as mutation from '../MutationsType'

const actions = {
  async [action.LOGIN_USER]({ commit, dispatch }, user) {
    try {
      let { data } = await api.login(user.data)
      setOrRemoveFromLS('user', {login: data.login, id: data.userId})
      dispatch(action.SET_USER, data)
      commit(mutation.SET_RESPONSE, data)
      return data
    } catch (err) {
      commit(mutation.SET_RESPONSE, err.response.data)
      return Promise.reject(err)
    }
  },

  async [action.LOG_OUT_USER]({ dispatch }) {
    Cookies.remove('jwt-token')
    dispatch(action.REMOVE_USER)
  },

  [action.REMOVE_USER]({ commit }) {
    commit(mutation.SET_USER, null)
    commit(mutation.SET_TOKEN, null)
    commit(mutation.CHANGE_LOGIN_STATE)
    commit(mutation.SET_RESPONSE, null)
    Cookies.remove('jwt-token')
  },

  async [action.CREATE_USER]({ commit }, user) {
    try {
      let { data } = await api.createUser(user.data)
      commit(mutation.SET_RESPONSE, data)
      return data
    } catch (err) {
      commit(mutation.SET_RESPONSE, err.response.data)
      return Promise.reject(err)
    }
  },

  [action.SET_USER]({ commit, dispatch }, user) {
    commit(mutation.SET_USER, user)
    if (isJWTValid(user.token)) {
      dispatch(action.SET_TOKEN, user.token)
      commit(mutation.CHANGE_LOGIN_STATE)
    } else {
      dispatch(action.LOG_OUT_USER)
    }
  },

  [action.SET_TOKEN]({ commit }, token) {
    commit(mutation.SET_TOKEN, token)
    Cookies.set('jwt-token', token)
  },

  [action.AUTO_LOGIN]({ dispatch, commit }) {
    const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']
    if (isJWTValid(token)) {
      dispatch(action.SET_TOKEN, token)
      commit(mutation.CHANGE_LOGIN_STATE)
    } else {
      dispatch(action.LOG_OUT_USER)
    }
  }
}

export default actions
