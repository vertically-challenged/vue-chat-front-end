<template>
<section class="chat">
  <message-list
    :style="{maxHeight: `calc(100vh - 149px - ${messageListHeight}px)`}"
    ref="messageListRef"
    :messages="messages"
    >
    </message-list>
  <chat-input @changeInput="resizeMessageList"></chat-input>
</section>
</template>

<script lang="ts">
import { defineComponent, Ref } from 'vue'
import { mapState } from 'vuex'
import ChatInput from './ChatInput.vue'
import MessageList from './MessageList.vue'

interface IMessage {
  userId: number
  text: string
  userName: string
}

export default defineComponent({
  data() {
    const messages: Array<IMessage> = []
    return {
      messages,
      messageListHeight: 0,
    }
  },
  components: {
    ChatInput,
    MessageList,
  },
  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ws: (state: any) => (state.ws.ws),
    }),
  },
  methods: {
    getDialog() {
      this.ws.send(JSON.stringify({
        type: 'get_dialog_list',
        userId: localStorage.getItem('user_id'),
        sessionId: localStorage.getItem('session_id'),
        sessionKey: localStorage.getItem('session_key'),
      }))
    },
    resizeMessageList(inputRef: Ref) {
      const inputSize = ((inputRef as unknown) as HTMLDivElement).offsetHeight
      if (inputSize === 21) this.messageListHeight = 0
      if (inputSize === 42) this.messageListHeight = 42
      if (inputSize === 63) this.messageListHeight = 63
      if (inputSize === 80) this.messageListHeight = 70
    },
  },
  mounted() {
    try {
      this.getDialog()
    } catch (error) {
      this.ws.addEventListener('open', () => {
        this.getDialog()
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.ws.addEventListener('message', (res: any) => {
      const resObj = JSON.parse(res.data)
      if (resObj.status === 'new_message') {
        this.messages.push({
          userId: resObj.userId,
          text: resObj.message,
          userName: resObj.name,
        })
      }
      if (resObj.status === 'get_dialog_list') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.messages = resObj.messages.map((message: any) => ({
          userId: message.sender,
          text: message.message,
          userName: message.name,
        }))
      }
    })
  },
})

export type { IMessage }
</script>

<style lang="css" scoped>
.chat {
  position: absolute;
  bottom: 0;
  padding: 10px;
  max-width: 100vw;
}
</style>
