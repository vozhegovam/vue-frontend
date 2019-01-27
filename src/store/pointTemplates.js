import axios from 'axios/index'

export default {
  state: {
    pointTemplates: [],
    editedParent: {
      id: null,
      parentPoint: '',
      childrenPoints: [],
      listTemplate: this.id,
      name: '',
      description: '',
      fine: 0,
      act: '',
      orderNumber: ''
    }
  },
  mutations: {
    LOAD_POINT_TEMPLATES (state, points) {
      state.pointTemplates = points
    },
    UPDATE_POINT (state, pointTemplate) {
      if (pointTemplate.parentPoint !== null) {
        state.editedParent = state.pointTemplates.find((template) => { return template.id === pointTemplate.parentPoint })
        let pidx = state.pointTemplates.map(p => p.id).indexOf(pointTemplate.parentPoint)
        let cidx = state.editedParent.childrenPoints.map(p => p.id).indexOf(pointTemplate.id)
        state.editedParent.childrenPoints.splice(cidx, 1, pointTemplate)
        state.pointTemplates.splice(pidx, 1, state.editedParent)
      } else {
        let idx = state.pointTemplates.map(p => p.id).indexOf(pointTemplate.id)
        state.pointTemplates.splice(idx, 1, pointTemplate)
      }
    },
    REMOVE_POINT (state, pointTemplate) {
      if (pointTemplate.parentPoint !== null) {
        state.editedParent = state.pointTemplates.find((template) => { return template.id === pointTemplate.parentPoint })
        let pidx = state.pointTemplates.map(p => p.id).indexOf(pointTemplate.parentPoint)
        state.editedParent.childrenPoints = state.editedParent.childrenPoints.filter((currentItem) => {
          return currentItem.id !== pointTemplate.id
        })
        state.pointTemplates.splice(pidx, 1, state.editedParent)
      } else {
        state.pointTemplates = state.pointTemplates.filter((currentItem) => {
          return currentItem.id !== pointTemplate.id
        })
      }
    }
  },
  actions: {
    async LOAD_POINT_TEMPLATES ({ commit, state }, { listId }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/points/' + listId)
        commit('LOAD_POINT_TEMPLATES', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async UPDATE_POINT ({ commit, state }, { pointTemplate }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        await axios.put('/api/points/' + pointTemplate.id, pointTemplate)
        commit('UPDATE_POINT', pointTemplate)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async REMOVE_POINT ({ commit, state }, { pointTemplate }) {
      commit('clearMessages')
      commit('setLoading', true)
      try {
        await axios.delete('/api/points/' + pointTemplate.id)
        commit('REMOVE_POINT', pointTemplate)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    getPointsByParent: state => {
      return state.pointTemplates
    }
  }
}
