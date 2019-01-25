export default {
  state: {
    loading: false,
    fileLoading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setFileLoading (state, payload) {
      state.fileLoading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setFileLoading ({commit}, payload) {
      commit('setFileLoading', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    fileLoading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
