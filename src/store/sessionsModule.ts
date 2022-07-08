/* eslint-disable @typescript-eslint/no-explicit-any */
const sessionsModule = {
  state: () => ({
    sessions: {
      auth: true,
    },
  }),
  mutations: {
    login(state: any) {
      state.sessions.auth = true
    },
    logout(state: any) {
      state.sessions.auth = false
    },
  },
  namespaced: true,
}

export default sessionsModule
