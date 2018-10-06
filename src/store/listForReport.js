import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    listExemplarsWithTemplate: [],
    listExemplarWithTemplate: null
  },
  mutations: {
    LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY (state, listExemplarsWithTemplate) {
      state.listExemplarsWithTemplate = listExemplarsWithTemplate
    },
    LOAD_LIST_EXEMPLAR_WITH_TEMPLATE_BY_LIST_ID (state, listExemplarWithTemplate) {
      state.listExemplarWithTemplate = listExemplarWithTemplate
    }
  },
  actions: {
    LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY: function ({ commit, state }, { companyId }) {
      axios
        .get('/api/lists_with_template/parent_id=' + companyId)
        .then(r => r.data)
        .then(listExemplarsWithTemplate => {
          commit('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY', listExemplarsWithTemplate)
        })
    },
    LOAD_LIST_EXEMPLAR_WITH_TEMPLATE_BY_LIST_ID: function ({ commit, state }, { listId }) {
      axios
        .get('/api/lists_with_template/' + listId)
        .then(r => r.data)
        .then(listExemplarWithTemplate => {
          commit('LOAD_LIST_EXEMPLAR_WITH_TEMPLATE_BY_LIST_ID', listExemplarWithTemplate)
        })
    }
  },
  getters: {
    getListExemplarWithTemplates: state => {
      return state.listExemplarsWithTemplate
    },
    getListExemplarWithTemplate: state => {
      return state.listExemplarWithTemplate
    }
  }
}
