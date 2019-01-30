export default {
  state: {
    loading: false,
    fileLoading: false,
    reportLoading: false,
    updateLoading: false,
    error: null,
    successMessage: null
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
    setSuccess (state, payload) {
      state.successMessage = payload
    },
    clearError (state) {
      state.error = null
    },
    clearSuccess (state) {
      state.successMessage = null
    },
    clearMessages (state) {
      state.error = null
      state.successMessages = null
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
    clearMessages ({commit}) {
      commit('clearError')
      commit('clearSuccess')
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
    },
    success (state) {
      return state.successMessage
    }
  }
}
