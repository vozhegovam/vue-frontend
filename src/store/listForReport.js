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
    async LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY ({ commit, state }, { companyId }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/lists_with_template/parent_id=' + companyId)
        commit('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async LOAD_LIST_EXEMPLAR_WITH_TEMPLATE_BY_LIST_ID ({ commit, state }, { listId }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/lists_with_template/' + listId)
        commit('LOAD_LIST_EXEMPLAR_WITH_TEMPLATE_BY_LIST_ID', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY_ID_FOR_REPORT ({ commit, state }, { companyId }) {
      commit('clearError')
      commit('setReportLoading', true)
      try {
        const response = await axios.get('/api/lists_with_template/report/' + companyId)
        commit('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY', response.data)
        commit('setReportLoading', false)
      } catch (error) {
        commit('setReportLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async LOAD_REPORT ({ commit, state }, { companyId }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/lists_with_template/new_report/' + companyId)
        commit('LOAD_REPORT', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
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
