import axios from 'axios/index'

export default {
  state: {
    listTemplates: []
  },
  mutations: {
    SET_LIST_TEMPLATES (state, lists) {
      state.listTemplates = lists
    }
  },
  actions: {
    LOAD_LIST_TEMPLATES: function ({ commit }) {
      axios
        .get('/api/lists/')
        .then(r => r.data)
        .then(lists => {
          commit('SET_LIST_TEMPLATES', lists)
        })
    }
  },
  getters: {
    getListTemplates: state => {
      return state.listTemplates
    }
  }
}
