import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    listExemplars: []
  },
  mutations: {
    LOAD_LIST_EXEMPLARS_BY_TEMPLATE_AND_COMPANY (state, listExemplars) {
      state.listExemplars = listExemplars
    },
    ADD_LIST_EXEMPLAR: (state, { listExemplar }) => {
      state.listExemplars.push(listExemplar)
    },
    UPDATE_LIST_EXEMPLAR: (state, { listExemplar }) => {
      let idx = state.listExemplars.map(p => p.id).indexOf(listExemplar.id)
      state.listExemplars.splice(idx, 1, listExemplar)
    },
    REMOVE_LIST_EXEMPLAR: (state, { listExemplar }) => {
      state.listExemplars = state.listExemplars.filter((curListExemplar) => {
        return listExemplar.id !== curListExemplar.id
      })
    }
  },
  actions: {
    async LOAD_LIST_EXEMPLARS_BY_TEMPLATE_AND_COMPANY ({ commit, state }, { companyId, listTemplateId }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/list_ex/all/' + companyId + '/' + listTemplateId)
        commit('LOAD_LIST_EXEMPLARS_BY_TEMPLATE_AND_COMPANY', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async LOAD_LIST_EXEMPLARS_BY_COMPANY ({ commit, state }, { companyId }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/list_ex/company_id=' + companyId)
        commit('LOAD_LIST_EXEMPLARS_BY_TEMPLATE_AND_COMPANY', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async ADD_NEW_LIST_EXEMPLAR ({ commit, state }, { listExemplar }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.post('/api/list_ex/add', listExemplar)
        commit('ADD_LIST_EXEMPLAR', { listExemplar: response.data })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async UPDATE_LIST_EXEMPLAR ({ commit, state }, { listExemplar }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.put('/api/list_ex/' + listExemplar.id, listExemplar)
        commit('UPDATE_LIST_EXEMPLAR', { listExemplar: response.data })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async REMOVE_LIST_EXEMPLAR ({ commit, state }, { listExemplar }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        await axios.delete('/api/list_ex/' + listExemplar.id)
        commit('REMOVE_LIST_EXEMPLAR', { listExemplar })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }

  },

  getters: {
    getListExemplarsByParentIdAndTemplateId: state => {
      return state.listExemplars
    }
    // getListExemplarsByParentId: state => listId => {
    //   return state.listExemplars.filter((listExemplar) => { return listExemplar.checkListId === listId })
    // }
  }
}
