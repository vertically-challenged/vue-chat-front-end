<template>
<button class="basic-button">
  <slot></slot>
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'basic-button',
})
</script>

<style lang="css" scoped>
.basic-button {
  background-color: var(--color-1);
  color: var(--color-2);
  cursor: pointer;
  margin: 5px;
  width: 300px;
  padding: 10px;
  font-size: 10pt;
  border: solid 1px var(--color-1);
}

.basic-button:hover,
.basic-button:focus {
  background-color: var(--color-4);
  color: var(--color-3);
  transition: var(--transition-default);
}
</style>
