import webSocket, { IResObj } from './webSocket'

const serverConnect = {
  dialog: {
    requestDialog(callback: (resObj: IResObj) => void) {
      webSocket.call({
        type: 'get_dialog_list',
        userId: localStorage.getItem('user_id'),
        sessionId: localStorage.getItem('session_id'),
        sessionKey: localStorage.getItem('session_key'),
      })
      webSocket.listener('get_dialog_list', callback)
    },
    subscribeToNewMessage(callback: (resObj: IResObj) => void) {
      webSocket.listener('new_message', callback)
    },
    sendMessage(message: string) {
      webSocket.call({
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
      webSocket.call({
        ...authorizationData,
        type: 'authorization',
      })
    },
    subscribeToLoginPositiveResponse(callback: (resObj: IResObj) => void) {
      webSocket.listener('authorized', callback)
    },
    subscribeToLoginNegativeResponse(callback: (resObj: IResObj) => void) {
      webSocket.listener('unauthorized', callback)
    },
    logout() {
      webSocket.call({
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
      webSocket.call({
        type: 'registration',
        ...registrationData,
      })
    },
    subscribeToRegistrationPositiveResponse(callback: (resObj: IResObj) => void) {
      webSocket.listener('registered', callback)
    },
    subscribeToRegistrationNegativeResponse(callback: (resObj: IResObj) => void) {
      webSocket.listener('unregistered', callback)
    },
  },
}

export type { IResObj }
export default serverConnect
