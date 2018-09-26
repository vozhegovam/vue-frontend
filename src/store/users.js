import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
    users: [],
    userList: []
  },
  mutations: {
    LOAD_USERS (state, users) {
      state.users = users
    },
    ADD_USER: (state, { user }) => {
      state.users.push(user)
    },
    UPDATE_USER: (state, { user }) => {
      let idx = state.users.map(p => p.id).indexOf(user.id)
      state.users.splice(idx, 1, user)
    },
    REMOVE_USER: (state, { user }) => {
      state.users = state.users.filter((currentUser) => {
        return currentUser.id !== user.id
      })
    }
  },
  actions: {
    LOAD_USERS: function ({ commit }) {
      axios
        .get('/api/users/')
        .then(r => r.data)
        .then(users => {
          commit('LOAD_USERS', users)
        })
    },
    ADD_NEW_USER: function ({ commit, state }, { user }) {
      axios.post('/api/users/add', user).then((response) => {
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
    },
    REMOVE_USER: function ({ commit, state }, { user }) {
      axios.delete('/api/users/' + user.id).then(() => {
        commit('REMOVE_USER', { user })
      }, (err) => {
        console.log(err)
      })
    }

  },

  getters: {
    getUsers: state => {
      return state.users
    },
    getUsersAsList: state => {
      state.users.forEach(function (item, i, arr) {
        state.userList.push({text: item.name, value: item.id})
      })
      return state.userList
    },
    getUserNameById: state => id => {
      return state.users.find(user => user.id === id).name
    },
    getUserByValue (id) {
      return this.$store.getters.getUsers.find(item => { return item.id === id }).name
    }
  }
}
