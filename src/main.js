import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as axios from 'axios'

Vue.use(Vuetify)

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['authorization'] = token
}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
