// For android studio emulator ws://10.0.2.2:8080
const ws = new WebSocket('ws://localhost:8080', 'echo-protocol')

const wsModule = {
  state: () => ({
    ws,
  }),
  namespaced: true,
}

export default wsModule
