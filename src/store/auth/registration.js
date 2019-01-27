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
      commit('clearMessages')
      commit('setLoading', true)
      try {
        await axios.post('/api/registration', newUser)
        commit('setLoading', false)
        commit('setSuccess', 'На вашу почту ' + newUser.email + 'было отправленно сообщение. Пожалуйста пройдите по ссылке из письма для активации аккаунта')
        // commit('AUTH_SUCCESS', response)
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
