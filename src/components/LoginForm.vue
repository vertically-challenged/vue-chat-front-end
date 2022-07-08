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
import { mapState } from 'vuex'

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
  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ws: (state: any) => (state.ws.ws),
    }),
  },
  methods: {
    login() {
      this.ws.send(JSON.stringify({
        type: 'authorization',
        ...this.authorizationData,
      }))
    },
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.ws.addEventListener('message', (res: any) => {
      const resObj = JSON.parse(res.data)
      if (resObj.status === 'authorized') {
        this.$store.commit('sessions/login')
        localStorage.setItem('user_id', resObj.userId)
        localStorage.setItem('session_id', resObj.sessionId)
        localStorage.setItem('session_key', resObj.sessionKey)
        this.$router.push('/chat')
      }
      if (resObj.status === 'unauthorized') {
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
