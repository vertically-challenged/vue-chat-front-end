/* eslint-disable @typescript-eslint/no-explicit-any */
const sessionsModule = {
  state: () => ({
    sessions: {
      auth: true,
    },
  }),
  getters: {
  },
  mutations: {
    login(state: any) {
      state.sessions.auth = true
    },
    logout(state: any) {
      state.sessions.auth = false
    },
  },
}

export default sessionsModule
