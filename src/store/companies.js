import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    companies: []
  },
  mutations: {
    LOAD_COMPANIES (state, companies) {
      state.companies = companies
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
      axios
        .get('/api/companies/')
        .then(r => r.data)
        .then(companies => {
          commit('LOAD_COMPANIES', companies)
        })
    },
    ADD_NEW_COMPANY: function ({ commit, state }, { company }) {
      console.log('company = ' + company.checked)
      axios.post('/api/companies/add', company).then((response) => {
        commit('ADD_COMPANY', { company: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    UPDATE_COMPANY: function ({ commit, state }, { company }) {
      console.log('COMPANY UPDATE = ' + JSON.stringify(company.data))
      axios.put('/api/companies/' + company.id, company).then((response) => {
        commit('UPDATE_COMPANY', { company: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    REMOVE_COMPANY: function ({ commit, state }, { company }) {
      axios.delete('/api/companies/' + company.id).then(() => {
        commit('REMOVE_COMPANY', { company })
      }, (err) => {
        console.log(err)
      })
    }

  },

  getters: {
    getCompanies: state => {
      return state.companies
    }
  }
}
