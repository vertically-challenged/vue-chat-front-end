<template>
<label for="login">
  <span class="hidden">
    <slot></slot>
  </span>
  <input :placeholder="placeholder" class="input" :type="type" id="login" />
</label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'basic-input',

  props: {
    type: String,
    placeholder: String,
  },
})
</script>

<style lang="css" scoped>
.input {
  width: 100%;
  padding: 10px;
  font-size: 10pt;
  border: solid 1px var(--color-1);
  background: var(--color-1);
  color: var(--color-2);
  font-weight: bold;
}

.input:focus {
  border: solid 1px var(--color-5);
}
</style>
