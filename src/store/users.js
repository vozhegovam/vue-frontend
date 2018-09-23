import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    users: []
  },
  mutations: {
    SET_USERS (state, users) {
      state.users = users
    },
    ADD_USER: (state, { user }) => {
      state.projects.push(user)
    },
    UPDATE_USER: (state, { user }) => {
      let idx = state.users.map(p => p.id).indexOf(user.id)
      state.users.splice(idx, 1, user)
    }
  },
  actions: {
    LOAD_USERS: function ({ commit }) {
      console.log('AAAAAAAAAA')
      axios
        .get('/api/users/')
        .then(r => r.data)
        .then(users => {
          commit('SET_USERS', users)
        })
    },
    ADD_NEW_USER: function ({ commit, state }, { user }) {
      console.log('user.name = ' + user.name)
      console.log('user.id = ' + user.id)
      axios.post('/api/users/add').then((response) => {
        commit('ADD_USER', { user: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    UPDATE_USER: function ({ commit, state }, { user }) {
      console.log('USER UPDATE = ' + JSON.stringify(user.data))
      axios.put('/api/users/' + user.id, user).then((response) => {
        commit('UPDATE_USER', { user: response.data })
      }, (err) => {
        console.log(err)
      })
    }

  },

  getters: {
    getUsers: state => {
      console.log('getUsers')
      return state.users
    }
  }
}
