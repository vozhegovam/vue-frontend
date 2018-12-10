import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    REG_REQUEST: function ({commit, dispatch}, { newUser }) {
      axios.post('/api/registration', newUser).then((response) => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    }
  },

  getters: {
  }
}
