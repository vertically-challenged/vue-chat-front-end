<template>
<div class="chat-input__container">
  <div
    class="chat-input"
    placeholder="Введите сообщение"
    contenteditable
    @input="changeInput"
  ></div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
  color: var(--color-2);
}

.chat-input__container {
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
</style>
