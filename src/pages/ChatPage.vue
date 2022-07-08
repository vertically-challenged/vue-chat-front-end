<template>
<chat-component />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatComponent from '@/components/ChatComponent.vue'

export default defineComponent({
  components: {
    ChatComponent,
  },
})
</script>

<style lang="css" scoped>

</style>
