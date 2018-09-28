import axios from 'axios/index'

export default {
  state: {
    listTemplates: [],
    currentTemplate: null
  },
  mutations: {
    LOAD_LIST_TEMPLATES (state, lists) {
      state.listTemplates = lists
    },
    LOAD_LIST_TEMPLATE (state, list) {
      state.listTemplate = list
    }
  },
  actions: {
    LOAD_LIST_TEMPLATES: function ({ commit }) {
      axios
        .get('/api/lists/')
        .then(r => r.data)
        .then(lists => {
          commit('LOAD_LIST_TEMPLATES', lists)
        })
    },
    LOAD_LIST_TEMPLATE: function ({ commit }, {listId}) {
      axios
        .get('/api/lists/' + listId)
        .then(r => r.data)
        .then(list => {
          commit('LOAD_LIST_TEMPLATE', list)
        })
    }
  },
  getters: {
    getListTemplates: state => {
      return state.listTemplates
    },
    getListTemplateById: state => {
      return state.currentTemplate
    }
  }
}
