interface ICallParams {
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

const serverConnect = {
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
  dialog: {
    requestDialog() {
      serverConnect.call({
        type: 'get_dialog_list',
        userId: localStorage.getItem('user_id'),
        sessionId: localStorage.getItem('session_id'),
        sessionKey: localStorage.getItem('session_key'),
      })
    },
    subscribeToReceiveDialogue(callback: (resObj: IResObj) => void) {
      serverConnect.listener('get_dialog_list', callback)
    },
    subscribeToNewMessage(callback: (resObj: IResObj) => void) {
      serverConnect.listener('new_message', callback)
    },
    sendMessage(message: string) {
      serverConnect.call({
        type: 'send_message',
        userId: localStorage.getItem('user_id'),
        sessionId: localStorage.getItem('session_id'),
        sessionKey: localStorage.getItem('session_key'),
        message,
      })
    },
  },
  authorization: {
    login(authorizationData: {
      emailOrLogin: string
      password: string
    }) {
      serverConnect.call({
        ...authorizationData,
        type: 'authorization',
      })
    },
    subscribeToLoginPositiveResponse(callback: (resObj: IResObj) => void) {
      serverConnect.listener('authorized', callback)
    },
    subscribeToLoginNegativeResponse(callback: (resObj: IResObj) => void) {
      serverConnect.listener('unauthorized', callback)
    },
    logout() {
      serverConnect.call({
        type: 'session_termination',
        userId: localStorage.getItem('user_id'),
        sessionId: localStorage.getItem('session_id'),
        sessionKey: localStorage.getItem('session_key'),
      })
      localStorage.removeItem('user_id')
      localStorage.removeItem('session_id')
      localStorage.removeItem('session_key')
    },
    registration(registrationData: {
      email: string
      login:string
      password: string
    }) {
      serverConnect.call({
        type: 'registration',
        ...registrationData,
      })
    },
    subscribeToRegistrationPositiveResponse(callback: (resObj: IResObj) => void) {
      serverConnect.listener('registered', callback)
    },
    subscribeToRegistrationNegativeResponse(callback: (resObj: IResObj) => void) {
      serverConnect.listener('unregistered', callback)
    },
  },
}

export default serverConnect
