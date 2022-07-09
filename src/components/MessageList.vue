<template>
<section class="message-list__container">
  <ul ref="messageList" class="message-list">
    <div class="message__container" v-for="(message, index) in messages" :key="message.id">
      <li class="message">
        <pre>{{message.text}}</pre>
      </li>
      <visibility-sensor
        v-if="messages.length - 1 === index"
        @observe="setScroll"
        :scrollArea="'messageList'"
      />
    </div>
  </ul>
</section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IMessage } from './ChatComponent.vue'

export default defineComponent({
  data() {
    return {
      scroll: true,
    }
  },
  props: {
    messages: {
      type: Array as PropType<Array<IMessage>>,
      required: true,
    },
  },
  methods: {
    setScroll(status: boolean) {
      this.scroll = status
      console.log('STATUS: ', this.scroll)
    },
  },
  updated() {
    console.log('UPDATED')
    if (this.scroll) {
      ((this.$refs.messageList as HTMLDivElement)
        .childNodes[(this.$refs.messageList as HTMLDivElement)
          .childNodes.length - 2] as HTMLDivElement).scrollIntoView()
    }
  },
})
</script>

<style lang="css" scoped>
.message-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  height: 400px;
  max-height: calc(90vh - 150px);
  overflow-y: scroll;
  border-radius: 18px;
}

.message-list__container {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 18px;
  background: var(--color-1);
  color: var(--color-2);
}
.message {
  display: inline-flex;
  max-width: 330px;
  padding: 10px 15px;
  background: var(--color-8);
  border-radius: 18px;
}

.message__container {
  margin-bottom: 20px;
}

.message__container:last-child {
  margin-bottom: 0;
}

@media (max-width: 450px) {
  .message {
    width: 80%;
    max-width: 300px;
  }

  .message-list {
    height: 76vh;
  }

  .message-list::-webkit-scrollbar {
    display: none;
  }

}
</style>
