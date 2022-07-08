<template>
<form class="form-auth" action="#" @submit.prevent >
  <basic-input placeholder="Логин" class="form-auth__input" type="text">Логин</basic-input>
  <basic-input placeholder="Пароль" class="form-auth__input" type="password">Пароль</basic-input>
  <basic-button @click="login">Войти</basic-button>
</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    login() {
      this.$store.commit('sessions/login')
      this.$router.push('/chat')
    },
  },
})
</script>

<style lang="css" scoped>
.form-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}

.form-auth__input {
  width: 300px;
  margin: 5px;
}
</style>
