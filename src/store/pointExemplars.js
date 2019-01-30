import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    pointExemplars: [],
    editedExParent: {}
  },
  mutations: {
    LOAD_POINT_EXEMPLARS (state, pointExemplars) {
      state.pointExemplars = pointExemplars
    },
    UPDATE_POINT_EXEMPLAR: (state, pointExemplar) => {
      if (pointExemplar.parentExemplarId !== null) {
        state.editedExParent = state.pointExemplars.find((exemplar) => { return exemplar.exemplarId === pointExemplar.parentExemplarId })
        let pidx = state.pointExemplars.map(p => p.exemplarId).indexOf(pointExemplar.parentExemplarId)
        let cidx = state.editedExParent.children.map(p => p.exemplarId).indexOf(pointExemplar.exemplarId)
        const chCount = state.editedExParent.children.length
        const chWithAnswerCount = state.editedExParent.children.filter(point => { return point.answer !== null }).length
        if (chWithAnswerCount === chCount) {
          if (state.editedExParent.children.find(point => { return point.answer === 'Нет' }) !== undefined) {
            state.editedExParent.answer = 'Нет'
          } else {
            state.editedExParent.answer = 'Да'
          }
        }
        state.editedExParent.children.splice(cidx, 1, pointExemplar)
        state.pointExemplars.splice(pidx, 1, state.editedExParent)
      } else {
        let idx = state.pointExemplars.map(p => p.exemplarId).indexOf(pointExemplar.exemplarId)
        if (pointExemplar.children.length !== 0) {
          // console.log(pointExemplar.children.forEach((point) => { point.answer = pointExemplar.answer }))
        }
        state.pointExemplars.splice(idx, 1, pointExemplar)
      }
    }
  },
  actions: {
    LOAD_POINT_EXEMPLARS_BY_COMPANY: function ({ commit }, { companyId }) {
      axios
        .get('/api/point_ex/company_id=' + companyId)
        .then(r => r.data)
        .then(pointExemplars => {
          commit('LOAD_POINT_EXEMPLARS', pointExemplars)
        })
    },
    LOAD_POINT_EXEMPLARS: function ({ commit }, { listExemplarId }) {
      axios
        .get('/api/point_ex/' + listExemplarId)
        .then(r => r.data)
        .then(pointExemplars => {
          commit('LOAD_POINT_EXEMPLARS', pointExemplars)
        })
    },
    UPDATE_POINT_EXEMPLAR: function ({ commit, state }, { pointExemplar }) {
      axios.put('/api/point_ex/' + pointExemplar.exemplarId, pointExemplar).then((response) => {
        commit('UPDATE_POINT_EXEMPLAR', pointExemplar)
      }, (err) => {
        console.log(err)
      })
    }
  },

  getters: {
    getPointExemplars: state => {
      return state.pointExemplars
    }
  }
}
