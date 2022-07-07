<template>
<section class="chat">
  <message-list></message-list>
  <chat-input></chat-input>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatInput from './ChatInput.vue'
import MessageList from './MessageList.vue'

export default defineComponent({
  components: {
    ChatInput,
    MessageList,
  },
})
</script>

<style lang="css" scoped>
</style>
