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
}

export default defineComponent({
  data() {
    const messages: Array<IMessage> = [
      {
        userId: 123,
        text: 'Lorem',
      },
    ]
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
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.ws.addEventListener('message', (res: any) => {
      const resObj = JSON.parse(res.data)
      if (resObj.status === 'new_message') {
        this.messages.push({
          userId: resObj.userId,
          text: resObj.message,
        })
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
