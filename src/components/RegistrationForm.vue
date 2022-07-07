<template>
<form class="form-reg" action="#" @submit.prevent >
  <basic-input placeholder="eMail" class="form-reg__input" type="email">Логин</basic-input>
  <basic-input placeholder="Логин" class="form-reg__input" type="text">Логин</basic-input>
  <basic-input placeholder="Пароль" class="form-reg__input" type="password">Пароль</basic-input>
  <basic-button>Зарегистрироваться</basic-button>
</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="css" scoped>
.form-reg {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}

.form-reg__input {
  width: 300px;
  margin: 5px;
}
</style>
