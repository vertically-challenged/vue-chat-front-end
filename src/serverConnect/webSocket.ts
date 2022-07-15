export interface ICallParams {
  type: string
  userId?: number | string | null
  sessionId?: string | null
  sessionKey?: string | null
  emailOrLogin?: string | null
  password?: string | null
  message?: string | null
  email?: string | null
  login?: string | null
}

export interface IResObj {
  status: string
  cause?: string
  userId?: number
  message?: string
  name?: string
  sessionId?: string
  sessionKey?: string
  messages?: Array<{
    sender: number | string
    message: string
    name: string}
  >
}

const webSocket = {
  ws: new WebSocket('ws://localhost:8080', 'echo-protocol'),
  call(params: ICallParams) {
    try {
      this.ws.send(JSON.stringify({
        ...params,
      }))
    } catch (error) {
      console.log(error)
      this.ws.addEventListener('open', () => {
        this.ws.send(JSON.stringify({
          ...params,
        }))
      })
    }
  },
  listener(event: string, callback: (resObj: IResObj) => void) {
    this.ws.addEventListener('message', (res: MessageEvent) => {
      const resObj = JSON.parse(res.data)
      if (resObj.status === event) {
        callback(resObj)
      }
    })
  },
}

export default webSocket
