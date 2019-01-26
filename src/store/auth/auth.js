import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'
// import * as router from 'vue-router'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    token: localStorage.getItem('JWT'),
    curUserId: localStorage.getItem('cur-uid'),
    curUserName: localStorage.getItem('cur-uname'),
    curUserRole: localStorage.getItem('cur-urole')
  },
  mutations: {
    AUTH_SUCCESS: (state, resp) => {
      state.token = resp.data.token
      state.curUserName = resp.data.user.email
      state.curUserRole = resp.data.user.role
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.token
    },
    AUTH_ERROR: (state) => {
      localStorage.removeItem('JWT')
      localStorage.removeItem('cur-uid')
      localStorage.removeItem('cur-uname')
      localStorage.removeItem('cur-urole')
      state.token = null
      state.curUser = null
      state.curUserId = null
      state.curUserName = null
      state.curUserRole = null
      delete axios.defaults.headers.common['Authorization']
    }
  },
  actions: {
    async LOGIN_USER ({commit, dispatch}, {userData}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.post('/api/login', userData)
        localStorage.setItem('JWT', response.data.token)
        localStorage.setItem('cur-uid', response.data.user.id)
        localStorage.setItem('cur-uname', response.data.user.email)
        localStorage.setItem('cur-urole', response.data.user.role)
        commit('setLoading', false)
        commit('AUTH_SUCCESS', response)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async AUTH_LOGOUT ({commit, dispatch}) {
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
    }
  },

  getters: {
    getCurrentUserEmail: state => {
      return state.curUserName
    },
    getCurrentUserId: state => {
      return state.curUserId
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
