import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    file: []
  },
  mutations: {
  },
  actions: {
    async LOAD_FILE ({ commit }, {companyId, fileName, format}) {
      commit('clearMessages')
      commit('setFileLoading', true)
      try {
        const response = await axios({
          url: '/api/download/file/company_id=' + companyId + '&format=' + format + '&file=' + fileName + '.' + format,
          method: 'GET',
          responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName + '.' + format)
        document.body.appendChild(link)
        link.click()
        commit('setFileLoading', false)
      } catch (error) {
        commit('setFileLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },

  getters: {
  }
}
