import Vue from 'vue'
import Vuex from 'vuex'
import listTemplates from './listTemplates'
import pointTemplates from './pointTemplates'
import users from './users'
import companies from './companies'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    listTemplates, pointTemplates, users, companies
  }
})
