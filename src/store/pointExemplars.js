import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    pointExemplars: []
  },
  mutations: {
    LOAD_POINT_EXEMPLARS (state, pointExemplars) {
      state.pointExemplars = pointExemplars
    },
    UPDATE_POINT_EXEMPLAR: (state, { pointExemplar }) => {
      let idx = state.pointExemplars.map(p => p.exemplarId).indexOf(pointExemplar.exemplarId)
      state.pointExemplars.splice(idx, 1, pointExemplar)
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
        commit('UPDATE_POINT_EXEMPLAR', { pointExemplar: response.data })
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
