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
    }
  },
  actions: {
    loadUsers ({ commit }) {
      console.log('AAAAAAAAAA')
      axios
        .get('http://localhost:8099/api/users')
        .then(r => r.data)
        .then(users => {
          commit('SET_USERS', users)
        })
    }

    // LOAD_USERS: function ({ commit }) {
    //   axios.get('http://localhost:8099/api/users/').then((response) => {
    //     commit('SET_USERS', { list: response.data })
    //   }, (err) => {
    //     console.log(err)
    //   })
    // }

  },

  getters: {
    getUsers: state => {
      return state.users
    }
  }
}
