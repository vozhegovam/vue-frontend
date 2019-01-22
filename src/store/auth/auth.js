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
    status: '',
    hasLoadedOnce: false,
    userRole: null,
    currentUser: null,
    isAdmin: localStorage.getItem('isAdmin')
  },
  mutations: {
    AUTH_REQUEST (state) {
      state.status = 'loading'
    },
    AUTH_CHECK_SUCCESS (state) {
      console.log('isAdmin = true')
      localStorage.setItem('isAdmin', true)
    },
    AUTH_CHECK_FAIL (state) {
      console.log('isAdmin = false')
      localStorage.setItem('isAdmin', false)
    },
    AUTH_SUCCESS: (state, resp) => {
      state.status = 'success'
      state.token = resp.data.token
      localStorage.setItem('JWT', resp.data.token)
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
        console.log('RESPONSE : ' + JSON.stringify(response))
        commit('AUTH_SUCCESS', response)
        // axios.post('/api/check', userData).then((response) => {
        //   console.log('RESPONSE : ' + JSON.stringify(response.data))
        //   commit('AUTH_CHECK_SUCCESS', response)
        // }).catch(err => {
        //   console.log(err)
        //   commit('AUTH_CHECK_FAIL', response)
        // })
        dispatch('AUTH_REQUEST')
      }).catch(err => {
        commit('AUTH_ERROR', err)
      })
    },
    AUTH_LOGOUT: function ({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('AUTH_LOGOUT')
        localStorage.removeItem('JWT')
      })
    }
  },

  getters: {
    getCurrentUser: state => {
      return state.currentUser
    },
    isTokenPresented: state => {
      return state.token !== null
    },
    isAdmin: state => {
      return state.isAdmin === 'true'
    }
  }
}
