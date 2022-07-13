<template>

<section class="message-list__container">
  <ul ref="messageList" class="message-list" v-bind="$attrs">
    <div
      class="message__container"
      v-for="(message, index) in messages"
      :key="JSON.stringify(message)"
      :class="{
        'you-message': Number(message.userId) === youId
      }"
    >
      <li class="message">
        <div class="message__user-name">{{message.userName}}</div>
        <div v-html="marked(message.text, { sanitize: true })" class="message__text">
        </div>
      </li>
      <visibility-sensor
        v-if="messages.length - 1 === index"
        @observe="setScroll"
        :scrollArea="'messageList'"
      />
    </div>
    <div/>
  </ul>
</section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { marked } from 'marked'
import { IMessage } from './ChatComponent.vue'

export default defineComponent({
  inheritAttrs: false,
  data() {
    return {
      marked,
      scroll: true,
      youId: Number(localStorage.getItem('user_id')),
    }
  },
  props: {
    messages: {
      type: Array as PropType<Array<IMessage>>,
      required: true,
    },
    messageListHeight: Number,
  },
  methods: {
    setScroll(status: boolean) {
      this.scroll = status
    },
    scrollDown() {
      if (this.scroll) {
        try {
          ((this.$refs.messageList as HTMLDivElement)
            .childNodes[(this.$refs.messageList as HTMLDivElement)
              .childNodes.length - 1] as HTMLDivElement).scrollIntoView()
        } catch (error) {
          console.log(error)
        }
      }
    },
    telegramResize() {
      let { clientHeight } = this.$refs.messageList as HTMLDivElement

      const resizeObserver = new ResizeObserver((entries) => {
        const top = (this.$refs.messageList as HTMLDivElement).scrollTop
        const { scrollHeight } = this.$refs.messageList as HTMLDivElement
        const blockHeight = entries[0].borderBoxSize[0].blockSize
        if (clientHeight > blockHeight) {
          (this.$refs.messageList as HTMLDivElement).scrollTop = top + (clientHeight - blockHeight)
        } else {
          const newTop = top - (blockHeight - clientHeight)
          if (scrollHeight - blockHeight > top) {
            (this.$refs.messageList as HTMLDivElement).scrollTop = newTop
          }
        }
        clientHeight = (this.$refs.messageList as HTMLDivElement).clientHeight
      })
      resizeObserver.observe((this.$refs.messageList as Element))
    },
  },
  updated() {
    this.scrollDown()
  },
  mounted() {
    this.telegramResize()
  },
})
</script>

<style lang="css" scoped>
.message-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  height: calc(100vh - 241px);
  overflow-y: scroll;
  overflow-x: hidden;
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
  flex-direction: column;
  max-width: 330px;
  padding: 10px 15px;
  background: var(--color-8);
  border-radius: 18px;
  margin-right: 10px;
}

.message__container {
  margin-bottom: 20px;
  animation: .5s show ease-in-out;
  animation-fill-mode: forwards;
  opacity: 0;
  margin-left: -420px;
}

.message__container:last-child {
  margin-bottom: 0;
}

.you-message {
  text-align: right;
  margin-left: 0px;
  margin-right: -420px;
}

.message__user-name {
  font-size: 12px;
  text-decoration: underline;
  color: var(--color-9);
  margin-bottom: 5px;
}

.message__text {
  word-wrap: break-word;
  text-align: left;
}

@keyframes show {
  to {
    opacity: 1;
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 450px) {
  .message {
    max-width: 300px;
  }

  .message-list::-webkit-scrollbar {
    display: none;
  }

}
</style>
