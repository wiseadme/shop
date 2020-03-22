import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecoder from 'jwt-decode'
import { lStorage, isJWTValid } from '@/utils'
import * as api from '@/api'
import * as action from '../ActionsType'
import * as mutation from '../MutationsType'

const actions = {
  async [action.LOGIN_USER]({ commit, dispatch }, user) {
    try {
      let { data } = await api.login(user.data)
      lStorage('user', { login: data.login, id: data.userId, role: data.role })
      dispatch(action.SET_USER, data)
      commit(mutation.CHANGE_LOGIN_STATE, true)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  async [action.LOG_OUT_USER]({ dispatch }) {
    Cookies.remove('jwt-token')
    lStorage('user', null, true)
    dispatch(action.REMOVE_USER)
  },

  [action.REMOVE_USER]({ commit }) {
    commit(mutation.SET_USER, null)
    commit(mutation.SET_TOKEN, null)
    commit(mutation.CHANGE_LOGIN_STATE, false)
    Cookies.remove('jwt-token')
  },

  async [action.CREATE_USER]({ commit }, user) {
    try {
      let { data } = await api.createUser(user.data)
      return data
    } catch (err) {
      return Promise.reject(err)
    }
  },

  [action.SET_USER]({ commit, dispatch }, user) {
    commit(mutation.SET_USER, user)
    if (isJWTValid(user.token)) {
      dispatch(action.SET_TOKEN, user.token)
      commit(mutation.CHANGE_LOGIN_STATE, true)
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
      const user = jwtDecoder(token)
      dispatch(action.SET_TOKEN, token)
      commit(mutation.CHANGE_LOGIN_STATE, true)
      commit(mutation.SET_USER, user)
    } else {
      dispatch(action.LOG_OUT_USER)
      commit(mutation.CHANGE_LOGIN_STATE, false)
    }
  }
}

export default actions
