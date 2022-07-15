<template>
<main-navigation/>
<router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import MainNavigation from '@/components/MainNavigation.vue'

export default defineComponent({
  data() {
    return {

    }
  },
  components: {
    MainNavigation,
  },
  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      auth: (state: any) => (state.sessions.sessions.auth),
    }),
  },
  mounted() {
    if (this.auth) {
      this.$router.push('/chat')
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
  },
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
  --color-9: rgba(0, 0, 144, 0.597);

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

img {
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 100%;
  border-radius: 20px;
}

li {
  margin-left: 20px;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  width: 6px;
  background-color: #b1b1b176;
  border-radius: 9em;
}

.hidden {
  display: none;
}

@media (max-width: 450px), (max-height: 600px) {
  .container {
    top: 50px;
  }
}

</style>
