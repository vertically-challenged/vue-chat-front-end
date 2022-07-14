<template>
<div class="chat-container">
  <section class="chat">
    <message-list
      :style="{maxHeight: `calc(100vh - 200px - ${messageListHeight}px)`}"
      ref="messageListRef"
      :messageListHeight="messageListHeight"
      :messages="messages"
      >
      </message-list>
    <chat-input @changeInput="resizeMessageList"></chat-input>
  </section>
</div>
</template>

<script lang="ts">
import { defineComponent, Ref } from 'vue'
import serverConnect, { IResObj } from '@/serverConnect'
import ChatInput from './ChatInput.vue'
import MessageList from './MessageList.vue'

interface IMessage {
  userId: number | string | undefined
  text: string | undefined
  userName: string | undefined
}

export default defineComponent({
  data() {
    const messages: Array<IMessage> = []
    return {
      messages,
      messageListHeight: 41,
    }
  },
  components: {
    ChatInput,
    MessageList,
  },
  methods: {
    resizeMessageList(inputRef: Ref) {
      const inputSize = ((inputRef as unknown) as HTMLDivElement).offsetHeight
      this.messageListHeight = inputSize
    },
  },
  mounted() {
    serverConnect.dialog.requestDialog()
    serverConnect.dialog.subscribeToReceiveDialogue((resObj: IResObj) => {
      if (resObj.messages) {
        this.messages = resObj.messages.map((message: {
        sender: number | string
        message: string
        name: string
      }) => ({
          userId: message.sender,
          text: message.message,
          userName: message.name,
        }))
      }
    })
    serverConnect.dialog.subscribeToNewMessage((resObj: IResObj) => {
      this.messages.push({
        userId: resObj.userId,
        text: resObj.message,
        userName: resObj.name,
      })
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

.chat-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
