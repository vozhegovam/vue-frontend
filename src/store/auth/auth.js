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
    username: localStorage.getItem('username'),
    status: '',
    hasLoadedOnce: false,
    userRole: null,
    isAdmin: false
  },
  mutations: {
    AUTH_REQUEST (state) {
      state.status = 'loading'
    },
    AUTH_CHECK_SUCCESS (state) {
      console.log('isAdmin = true')
      state.isAdmin = true
    },
    AUTH_CHECK_FAIL (state) {
      console.log('isAdmin = false')
      state.isAdmin = false
    },
    AUTH_SUCCESS: (state, resp) => {
      state.status = 'success'
      state.token = resp.data.token
      localStorage.setItem('JWT', resp.data.token)
      localStorage.setItem('username', resp.headers.username)
    },
    AUTH_ERROR (state) {
      state.status = 'error'
      state.hasLoadedOnce = true
    },
    AUTH_LOGOUT (state) {
      // state.token = null
    }
  },
  actions: {
    AUTH_REQUEST: function ({commit, dispatch}, {userData}) {
      axios.post('/api/login', userData).then((response) => {
        commit('AUTH_SUCCESS', response)
        axios.post('/api/check', userData).then((response) => {
          commit('AUTH_CHECK_SUCCESS', response)
        }).catch(err => {
          console.log(err)
          commit('AUTH_CHECK_FAIL', response)
        })
        dispatch('AUTH_REQUEST')
      }).catch(err => {
        commit('AUTH_ERROR', err)
      })
    },
    AUTH_LOGOUT: function ({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('AUTH_LOGOUT')
        localStorage.removeItem('username')
        localStorage.removeItem('JWT')
        // resolve()
      })
    }
  },

  getters: {
    getCurrentUserName: state => {
      return state.username
    }
  }
}
