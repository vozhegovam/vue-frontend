import axios from 'axios/index'

export default {
  state: {
    pointTemplates: []
  },
  mutations: {
    SET_POINT_TEMPLATES (state, points) {
      state.pointTemplates = points
    }
  },
  actions: {
    LOAD_POINT_TEMPLATES: function ({ commit, state }, { listId }) {
      axios
        .get('/api/points/' + listId)
        .then(r => r.data)
        .then(points => {
          commit('SET_POINT_TEMPLATES', points)
        })
    }
  },
  getters: {
    getPointsByParent: state => {
      return state.pointTemplates
    }
  }
}
