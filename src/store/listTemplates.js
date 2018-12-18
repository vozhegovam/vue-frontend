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
    MIGRATE_LIST_TEMPLATES: function ({ commit }) {
      axios
        .get('/api/lists/update')
        .then(r => r.data)
        .then(lists => {
          commit('LOAD_LIST_TEMPLATES', lists)
        })
    },
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
    },
    UPDATE_LIST_TEMPLATE: function ({ commit, state }, { listTemplate }) {
      axios.put('/api/lists/' + listTemplate.id, listTemplate).then((response) => {
        commit('UPDATE_LIST_TEMPLATE', { listTemplate: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    REMOVE_LIST_TEMPLATE: function ({ commit, state }, { listTemplate }) {
      axios.delete('/api/lists/' + listTemplate.id).then(() => {
        commit('REMOVE_LIST_TEMPLATE', { listTemplate })
      }, (err) => {
        console.log(err)
      })
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
