import { createStore } from 'vuex'
import sessionsModule from './sessionsModule'
import wsModule from './wsModule'

const store = createStore({
  modules: {
    sessions: sessionsModule,
    ws: wsModule,
  },
})

export default store
