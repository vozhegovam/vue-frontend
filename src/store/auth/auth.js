import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    token: localStorage.getItem('JWT') || '',
    status: '',
    hasLoadedOnce: false,
    userRole: null
  },
  mutations: {
    AUTH_REQUEST (state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS (state, resp, userData) {
      state.status = 'success'
      state.token = resp.data.token
      localStorage.setItem('JWT', resp.data.token)
      localStorage.setItem('username', userData.email)
      state.hasLoadedOnce = true
      state.userRole = resp.role
    },
    AUTH_ERROR (state) {
      state.status = 'error'
      state.hasLoadedOnce = true
    },
    AUTH_LOGOUT (state) {
      state.token = ''
    }
  },
  actions: {
    AUTH_REQUEST: function ({commit, dispatch}, {userData}) {
      console.log('userData : ' + userData)
      axios.post('/api/login', userData).then((response) => {
        console.log('response : ' + JSON.stringify(response))
        commit('AUTH_SUCCESS', response, userData)
        dispatch('AUTH_REQUEST')
        // resolve(response)
      }).catch(err => {
        commit('AUTH_ERROR', err)
        localStorage.removeItem('user-token')
        // reject(err)
      })
    },
    AUTH_LOGOUT: function ({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('AUTH_LOGOUT')
        localStorage.removeItem('user-token')
        resolve()
      })
    }
  },

  getters: {
    isAuth: state => {
      return !!state.token
    },
    authStatus: state => state.status
  }
}
