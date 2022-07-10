<template>
<section class="chat">
  <message-list :messages="messages"></message-list>
  <chat-input></chat-input>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
  padding: 10px;
  max-width: 100vw;
}
</style>
