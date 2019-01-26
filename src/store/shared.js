export default {
  state: {
    loading: false,
    fileLoading: false,
    reportLoading: false,
    updateLoading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setFileLoading (state, payload) {
      state.fileLoading = payload
    },
    setReportLoading (state, payload) {
      state.reportLoading = payload
    },
    setUpdateLoading (state, payload) {
      state.updateLoading = payload
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
    setReportLoading ({commit}, payload) {
      commit('setReportLoading', payload)
    },
    setUpdateLoading ({commit}, payload) {
      commit('setUpdateLoading', payload)
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
      return state.fileLoading
    },
    reportLoading (state) {
      return state.reportLoading
    },
    updateLoading (state) {
      return state.updateLoading
    },
    error (state) {
      return state.error
    }
  }
}
