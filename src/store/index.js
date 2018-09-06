import Vue from 'vue'
import Vuex from 'vuex'
import listTemplates from './listTemplates'
import pointTemplates from './pointTemplates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    listTemplates, pointTemplates
  }
})
