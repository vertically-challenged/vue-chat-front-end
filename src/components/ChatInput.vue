<template>
<div class="chat-input__container" ref="inputContainerRef">
  <div
    class="chat-input"
    placeholder="Сообщение..."
    contenteditable
    ref="inputRef"
    @input="changeInput"
  ></div>
  <button
    class="chat-input__button"
    type="submit"
    @click="sendMessage"
  >
    <img src="@/icons/icons-submit-button.png" alt="Отправить">
  </button>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import serverConnect from '@/serverConnect'

export default defineComponent({
  data() {
    return {
      message: '',
    }
  },
  methods: {
    changeInput(event: Event) {
      if (event.target) {
        this.message = (event.target as HTMLDivElement).innerText
        this.$emit('changeInput', this.$refs.inputContainerRef)
      }
    },
    sendMessage() {
      if (this.message) {
        serverConnect.dialog.sendMessage(this.message)
        this.message = '';
        (this.$refs.inputRef as HTMLDivElement).innerText = ''
        this.$emit('changeInput', this.$refs.inputRef)
      }
    },
  },
})
</script>

<style lang="css" scoped>
.chat-input {
  width: 90vw;
  max-width: 500px;
  min-height: 18px;
  max-height: 80px;
  overflow-y: scroll;
  font-size: 18px;
  padding-right: 10px;
  color: var(--color-2);
  transition: var(--transition-default);
}

.chat-input::-webkit-scrollbar {
  display: none;
}

.chat-input:empty:not(:focus):before{
    content:attr(placeholder);
    color: white;
    opacity: .5;
}

.chat-input__container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  min-height: 30px;
  max-height: 90px;
  padding: 10px 28px;
  background: var(--color-1);
  border-radius: 18px;
}

.chat-input__button {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 40px;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.chat-input__button img {
  margin: 0;
  width: 30px;
  opacity: .5;
  transition: var(--transition-default);
}

.chat-input__button:focus img,  .chat-input__button:hover img {
  opacity: .8;
}

</style>
