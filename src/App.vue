<template>
<div class="container">
  <router-view />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="css">
:root {
  /* Colors */
  --color-1: rgb(50, 50, 50);
  --color-2: white;
  --color-3: yellow;
  --color-4: rgb(40, 40, 40);
  --color-5: rgb(225, 225, 60);
  --color-6: red;
  --color-7: rgba(50, 50, 50, 0.25);
  --color-8: rgb(98, 98, 98);

  /* Transitions */
  --transition-default: .5s;
}

* {
  font-family: "OpenSans", Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}

body {
  background: var(--color-8);
}

.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  width: 6px;
  background-color: #b1b1b1;
  border-radius: 9em;
}

.hidden {
  display: none;
}

</style>
