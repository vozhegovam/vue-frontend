import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    async REG_REQUEST ({commit, dispatch}, { newUser }) {
      // axios.post('/api/registration', newUser).then((response) => {
      //   console.log(response)
      // }).catch(err => {
      //   console.log(err)
      // })
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.post('/api/registration', newUser)
        commit('setLoading', false)
        commit('AUTH_SUCCESS', response)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },

  getters: {
  }
}
