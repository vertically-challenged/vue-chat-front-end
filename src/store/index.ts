import { createStore } from 'vuex'
import sessionsModule from './sessionsModule'

const store = createStore({
  modules: {
    sessions: sessionsModule,
  },
})

export default store
