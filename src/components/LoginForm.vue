<template>
<form class="form-auth" action="#" @submit.prevent >
  <basic-input
    placeholder="Логин"
    class="form-auth__input"
    type="text"
    v-model="authorizationData.emailOrLogin"
  >
    Логин
  </basic-input>
  <basic-input
    placeholder="Пароль"
    class="form-auth__input"
    type="password"
    v-model="authorizationData.password"
  >
    Пароль
  </basic-input>
  <basic-button @click="login">Войти</basic-button>
  <p v-if="unauthorizedMessage" class="form-auth__alert">⚠️ : {{unauthorizedMessage}}</p>
</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import serverConnect, { IResObj } from '@/serverConnect'

export default defineComponent({
  data() {
    return {
      authorizationData: {
        emailOrLogin: '',
        password: '',
      },
      unauthorizedMessage: '',
    }
  },
  methods: {
    login() {
      serverConnect.authorization.login(this.authorizationData)
    },
  },
  mounted() {
    serverConnect.authorization.subscribeToLoginPositiveResponse((resObj: IResObj) => {
      this.$store.commit('sessions/login')
      if (resObj.userId && resObj.sessionId && resObj.sessionKey) {
        localStorage.setItem('user_id', String(resObj.userId))
        localStorage.setItem('session_id', resObj.sessionId)
        localStorage.setItem('session_key', resObj.sessionKey)
      }
      this.$router.push('/chat')
    })
    serverConnect.authorization.subscribeToLoginNegativeResponse((resObj: IResObj) => {
      if (resObj.message) {
        this.unauthorizedMessage = resObj.message
      }
    })
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

.form-auth__alert{
  text-align: center;
  width: 300px;
  margin: 5px;
  font-size: 12pt;
  color: var(--color-2);
}
</style>
