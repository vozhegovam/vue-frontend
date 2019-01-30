import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    token: localStorage.getItem('JWT'),
    curUserId: localStorage.getItem('cur-uid'),
    curUserName: localStorage.getItem('cur-uname'),
    curUserRole: localStorage.getItem('cur-urole'),
    curUserBalance: localStorage.getItem('cur-ubalance')
  },
  mutations: {
    AUTH_SUCCESS: (state, resp) => {
      localStorage.setItem('JWT', resp.data.token)
      localStorage.setItem('cur-uid', resp.data.user.id)
      localStorage.setItem('cur-uname', resp.data.user.email)
      localStorage.setItem('cur-urole', resp.data.user.role)
      localStorage.setItem('cur-ubalance', resp.data.user.numberOfAttempts)
      state.token = resp.data.token
      state.curUserId = resp.data.id
      state.curUserName = resp.data.user.email
      state.curUserRole = resp.data.user.role
      state.curUserBalance = resp.data.user.numberOfAttempts
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.token
    },
    DECREASE_USER_BALANCE (state) {
      state.curUserBalance = state.curUserBalance - 1
      localStorage.setItem('cur-ubalance', state.curUserBalance)
    },
    AUTH_ERROR: (state) => {
      localStorage.removeItem('JWT')
      localStorage.removeItem('cur-uid')
      localStorage.removeItem('cur-uname')
      localStorage.removeItem('cur-urole')
      localStorage.removeItem('cur-ubalance')
      state.token = null
      state.curUserId = null
      state.curUserName = null
      state.curUserRole = null
      state.curUserBalance = null
      delete axios.defaults.headers.common['Authorization']
    }
  },
  actions: {
    async LOGIN_USER ({commit, dispatch}, {userData}) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.post('/api/login', userData)
        commit('setLoading', false)
        commit('AUTH_SUCCESS', response)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async AUTH_LOGOUT ({commit, dispatch}) {
      commit('clearMessages')
      try {
        await axios.get('/api/logout')
        commit('AUTH_ERROR')
        commit('setLoading', false)
      } catch (error) {
        commit('AUTH_ERROR')
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async AUTH_ACTIVATION ({commit, dispatch}, {code}) {
      commit('clearMessages')
      try {
        await axios.get('/api/activate/' + code)
        commit('setSuccess', 'Пользователь успешно активирован')
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', 'Невозможно активировать пользователя')
        throw error
      }
    }
  },

  getters: {
    getCurrentUserEmail: state => {
      return state.curUserName
    },
    getCurrentUserId: state => {
      return state.curUserId
    },
    getCurrentUserBalance: state => {
      return state.curUserBalance
    },
    getToken: state => {
      return state.token
    },
    isTokenPresented: state => {
      return state.token !== null && state.token !== undefined
    },
    isUserAdmin: state => {
      return state.curUserRole === 'Администратор'
    }
  }
}
