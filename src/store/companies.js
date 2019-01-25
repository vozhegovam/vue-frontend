import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    companies: [],
    company: null
  },
  mutations: {
    LOAD_COMPANIES (state, companies) {
      state.companies = companies
    },
    LOAD_COMPANY (state, company) {
      state.company = company
    },
    ADD_COMPANY: (state, { company }) => {
      state.companies.push(company)
    },
    UPDATE_COMPANY: (state, { company }) => {
      let idx = state.companies.map(p => p.id).indexOf(company.id)
      state.companies.splice(idx, 1, company)
    },
    REMOVE_COMPANY: (state, { company }) => {
      state.companies = state.companies.filter((currentCompany) => {
        return currentCompany.id !== company.id
      })
    }
  },
  actions: {
    LOAD_COMPANIES: function ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      axios
        .get('/api/companies/')
        .then(r => r.data)
        .then(companies => {
          commit('LOAD_COMPANIES', companies)
          commit('setLoading', false)
        }).catch((error) => {
          commit('setLoading', false)
          commit('setError', error.message)
        })
    },
    LOAD_COMPANY: function ({ commit }, { companyId }) {
      axios
        .get('/api/companies/' + companyId)
        .then(r => r.data)
        .then(company => {
          commit('LOAD_COMPANY', company)
        }).catch((error) => {
          commit('setError', error.message)
        })
    },
    async ADD_NEW_COMPANY ({ commit, state }, { company }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.post('/api/companies/add', company)
        commit('ADD_COMPANY', { company: response.data })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async UPDATE_COMPANY ({ commit, state }, { company }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.put('/api/companies/' + company.id, company)
        commit('UPDATE_COMPANY', { company: response.data })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async REMOVE_COMPANY ({ commit, state }, { company }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await axios.delete('/api/companies/' + company.id)
        commit('REMOVE_COMPANY', { company })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },

  getters: {
    getCompanies: state => {
      return state.companies
    },
    getCompany: state => {
      return state.company
    }
  }
}
