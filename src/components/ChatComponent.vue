<template>
<section class="chat">
  <message-list :messages="messages"></message-list>
  <chat-input @sendMessage="sendMessage"></chat-input>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatInput from './ChatInput.vue'
import MessageList from './MessageList.vue'

interface IMessage {
  id: number
  userId: number
  text: string
}

export default defineComponent({
  data() {
    const messages: Array<IMessage> = [
      {
        id: 123,
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
  methods: {
    sendMessage(message: string) {
      this.messages.push({
        id: 0,
        userId: Number(localStorage.getItem('user_id')),
        text: message,
      })
    },
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
