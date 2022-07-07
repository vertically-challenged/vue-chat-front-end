<template>
<section>
  <login-form></login-form>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '@/components/LoginForm.vue'

export default defineComponent({
  components: {
    LoginForm,
  },
})
</script>

<style lang="css" scoped>

</style>
