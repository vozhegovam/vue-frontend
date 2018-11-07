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
    LOAD_FILE: function ({ commit }, {companyId, fileName}) {
      axios({
        url: '/api/download/file/company_id=' + companyId + '&file=' + fileName,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      })
    }
  },

  getters: {
  }
}
