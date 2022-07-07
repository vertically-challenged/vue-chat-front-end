<template>
<section>
  <registration-form/>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegistrationForm from '@/components/RegistrationForm.vue'

export default defineComponent({
  components: {
    RegistrationForm,
  },
})
</script>

<style lang="css" scoped>

</style>
