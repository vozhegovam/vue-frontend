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
    LOAD_LIST_EXEMPLARS_BY_TEMPLATE_AND_COMPANY: function ({ commit, state }, { companyId, listTemplateId }) {
      axios
        .get('/api/list_ex/all/' + companyId + '/' + listTemplateId)
        .then(r => r.data)
        .then(listExemplars => {
          commit('LOAD_LIST_EXEMPLARS_BY_TEMPLATE_AND_COMPANY', listExemplars)
        })
    },
    LOAD_LIST_EXEMPLARS_BY_COMPANY: function ({ commit, state }, { companyId }) {
      axios
        .get('/api/list_ex/company_id=' + companyId)
        .then(r => r.data)
        .then(listExemplars => {
          commit('LOAD_LIST_EXEMPLARS_BY_TEMPLATE_AND_COMPANY', listExemplars)
        })
    },
    ADD_NEW_LIST_EXEMPLAR: function ({ commit, state }, { listExemplar }) {
      axios.post('/api/list_ex/add', listExemplar).then((response) => {
        commit('ADD_LIST_EXEMPLAR', { listExemplar: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    UPDATE_LIST_EXEMPLAR: function ({ commit, state }, { listExemplar }) {
      axios.put('/api/list_ex/' + listExemplar.id, listExemplar).then((response) => {
        commit('UPDATE_LIST_EXEMPLAR', { listExemplar: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    REMOVE_LIST_EXEMPLAR: function ({ commit, state }, { listExemplar }) {
      console.log('DELETE = ' + listExemplar.id)
      axios.delete('/api/list_ex/' + listExemplar.id).then(() => {
        commit('REMOVE_LIST_EXEMPLAR', { listExemplar })
      }, (err) => {
        console.log(err)
      })
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
