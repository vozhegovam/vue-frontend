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
    async LOAD_USERS ({ commit, state }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.get('/api/users/')
        commit('LOAD_USERS', response.data)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async ADD_NEW_USER ({ commit, state }, { user }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.post('/api/users/add', user)
        commit('ADD_USER', { user: response.data })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async UPDATE_USER ({ commit, state }, { user }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.put('/api/users/' + user.id, user)
        commit('UPDATE_USER', { user: response.data })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async REMOVE_USER ({ commit, state }, { user }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await axios.delete('/api/users/' + user.id)
        commit('REMOVE_USER', { user })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
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
    }
  }
}
