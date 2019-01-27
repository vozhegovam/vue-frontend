import axios from 'axios/index'

export default {
  state: {
    listTemplates: [],
    listTemplate: null
  },
  mutations: {
    LOAD_LIST_TEMPLATES (state, lists) {
      state.listTemplates = lists
    },
    LOAD_LIST_TEMPLATE (state, list) {
      state.listTemplate = list
    },
    UPDATE_LIST_TEMPLATE: (state, { listTemplate }) => {
      let idx = state.listTemplates.map(p => p.id).indexOf(listTemplate.id)
      state.listTemplates.splice(idx, 1, listTemplate)
    },
    REMOVE_LIST_TEMPLATE: (state, { listTemplate }) => {
      state.listTemplates = state.listTemplates.filter((currentItem) => {
        return currentItem.id !== listTemplate.id
      })
    }
  },
  actions: {
    async MIGRATE_LIST_TEMPLATES ({ commit }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/lists/update')
        commit('LOAD_LIST_TEMPLATES', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async LOAD_LIST_TEMPLATES ({ commit }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/lists/')
        commit('LOAD_LIST_TEMPLATES', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async LOAD_LIST_TEMPLATE ({ commit }, {listId}) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/lists/' + listId)
        commit('LOAD_LIST_TEMPLATE', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async UPDATE_LIST_TEMPLATE ({ commit, state }, { listTemplate }) {
      commit('clearMessages')
      commit('setUpdateLoading', true)
      try {
        const response = await axios.put('/api/lists/' + listTemplate.id, listTemplate)
        commit('UPDATE_LIST_TEMPLATE', { listTemplate: response.data })
        commit('setUpdateLoading', false)
      } catch (error) {
        commit('setUpdateLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async REMOVE_LIST_TEMPLATE ({ commit, state }, { listTemplate }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        await axios.delete('/api/lists/' + listTemplate.id)
        commit('REMOVE_LIST_TEMPLATE', { listTemplate })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    getListTemplates: state => {
      return state.listTemplates
    },
    getListTemplateById: state => {
      return state.listTemplate
    }
  }
}
