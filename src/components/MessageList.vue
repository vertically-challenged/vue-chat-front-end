<template>
<section class="message-list__container">
  <ul class="message-list">
    <li class="message" v-for="message in messages" :key="message.id">
      {{message.text}}
    </li>
  </ul>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      messages: [
        {
          id: 12345,
          userId: 12345,
          text: `
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          `,
        },
        {
          id: 12345,
          userId: 12345,
          text: `
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          `,
        },
        {
          id: 12345,
          userId: 12345,
          text: `
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          `,
        },
      ],
    }
  },
})
</script>

<style lang="css" scoped>
.message-list {
  list-style: none;
  height: 400px;
  max-height: 90vh;
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
  max-width: 360px;
  padding: 15px;
  background: var(--color-8);
  border-radius: 18px;
  margin-bottom: 20px;
}

.message:last-child {
  margin-bottom: 0;
}
</style>
