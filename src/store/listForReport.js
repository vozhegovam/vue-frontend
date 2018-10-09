import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    listExemplarsWithTemplate: [],
    listExemplarWithTemplate: null,
    reportPath: null
  },
  mutations: {
    LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY (state, listExemplarsWithTemplate) {
      state.listExemplarsWithTemplate = listExemplarsWithTemplate
    },
    LOAD_LIST_EXEMPLAR_WITH_TEMPLATE_BY_LIST_ID (state, listExemplarWithTemplate) {
      state.listExemplarWithTemplate = listExemplarWithTemplate
    },
    LOAD_REPORT (state, reportPath) {
      state.reportPath = reportPath
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
    },
    LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY_ID_FOR_REPORT: function ({ commit, state }, { companyId }) {
      axios
        .get('/api/lists_with_template/report/' + companyId)
        .then(r => r.data)
        .then(listExemplarsWithTemplate => {
          commit('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY', listExemplarsWithTemplate)
        })
    },
    LOAD_REPORT: function ({ commit, state }, { companyId }) {
      axios
        .get('/api/lists_with_template/new_report/' + companyId)
        .then(r => r.data)
        .then(reportPath => {
          commit('LOAD_REPORT', reportPath)
        })
    }
  },
  getters: {
    getListExemplarWithTemplates: state => {
      return state.listExemplarsWithTemplate
    },
    getListExemplarWithTemplate: state => {
      return state.listExemplarWithTemplate
    },
    getReportPath: state => {
      return state.reportPath
    }
  }
}
