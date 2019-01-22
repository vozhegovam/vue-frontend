import Vue from 'vue'
import Vuex from 'vuex'
import listTemplates from './listTemplates'
import pointTemplates from './pointTemplates'
import users from './users'
import companies from './companies'
import listExemplars from './listExemplars'
import pointExemplars from './pointExemplars'
import listForReport from './listForReport'
import file from './file'
import shared from './shared'
import auth from './auth/auth'
import registration from './auth/registration'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    listTemplates, pointTemplates, users, companies, listExemplars, pointExemplars, listForReport, file, auth, registration, shared
  }
})
