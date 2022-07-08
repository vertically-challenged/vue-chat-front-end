/* eslint-disable @typescript-eslint/no-explicit-any */
const wsModule = {
  state: () => ({
    ws: new WebSocket('ws://localhost:8080', 'echo-protocol'),
  }),
  namespaced: true,
}

export default wsModule
