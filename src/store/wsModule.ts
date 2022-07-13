/* eslint-disable @typescript-eslint/no-explicit-any */
const wsModule = {
  state: () => ({
    // ws://10.0.2.2:8080
    ws: new WebSocket('ws://localhost:8080', 'echo-protocol'),
  }),
  namespaced: true,
}

export default wsModule
