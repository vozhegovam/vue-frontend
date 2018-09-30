import axios from 'axios/index'

export default {
  state: {
    pointTemplates: []
  },
  mutations: {
    LOAD_POINT_TEMPLATES (state, points) {
      state.pointTemplates = points
    },
    UPDATE_POINT: (state, { pointTemplate }) => {
      let idx = state.pointTemplates.map(p => p.id).indexOf(pointTemplate.id)
      state.pointTemplates.splice(idx, 1, pointTemplate)
    },
    REMOVE_POINT: (state, { pointTemplate }) => {
      state.pointTemplates = state.pointTemplates.filter((currentItem) => {
        return currentItem.id !== pointTemplate.id
      })
    }
  },
  actions: {
    LOAD_POINT_TEMPLATES: function ({ commit, state }, { listId }) {
      axios
        .get('/api/points/' + listId)
        .then(r => r.data)
        .then(points => {
          commit('LOAD_POINT_TEMPLATES', points)
        })
    },
    UPDATE_POINT: function ({ commit, state }, { pointTemplate }) {
      axios.put('/api/points/' + pointTemplate.id, pointTemplate).then((response) => {
        commit('UPDATE_POINT', { pointTemplate: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    REMOVE_POINT: function ({ commit, state }, { pointTemplate }) {
      axios.delete('/api/points/' + pointTemplate.id).then(() => {
        commit('REMOVE_POINT', { pointTemplate })
      }, (err) => {
        console.log(err)
      })
    }
  },
  getters: {
    getPointsByParent: state => {
      return state.pointTemplates
    }
  }
}
