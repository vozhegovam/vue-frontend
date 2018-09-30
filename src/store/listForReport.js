import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    listExemplarsWithTemplate: []
  },
  mutations: {
    LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_AND_COMPANY (state, listExemplarsWithTemplate) {
      state.listExemplarsWithTemplate = listExemplarsWithTemplate
    }
  },
  actions: {
    LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_AND_COMPANY: function ({ commit, state }, { companyId }) {
      axios
        .get('/api/lists_with_template/' + companyId)
        .then(r => r.data)
        .then(listExemplarsWithTemplate => {
          commit('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_AND_COMPANY', listExemplarsWithTemplate)
        })
    }
  },
  getters: {
    getListExemplarWithTemplates: state => {
      return state.listExemplarsWithTemplate
    }
  }
}
