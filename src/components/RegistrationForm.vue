<template>
<form class="form-reg" action="#" @submit.prevent >
  <basic-input
    placeholder="eMail"
    class="form-reg__input"
    type="email"
    v-model="registrationData.email"
  />
  <basic-input
    placeholder="Логин"
    class="form-reg__input"
    type="text"
    v-model="registrationData.login"
  />
  <basic-input
    placeholder="Пароль"
    class="form-reg__input"
    type="password"
    v-model="registrationData.password"
  />
  <basic-button
  @click="userRegistration"
  >
    Зарегистрироваться
  </basic-button>
  <p class="form-reg__alert">⚠️ : {{unregisteredMessage}}</p>
</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  data() {
    return {
      registrationData: {
        email: '',
        login: '',
        password: '',
      },
      unregisteredMessage: '',
    }
  },
  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ws: (state: any) => (state.ws.ws),
    }),
  },
  methods: {
    userRegistration() {
      this.ws.send(JSON.stringify({
        type: 'registration',
        ...this.registrationData,
      }))
    },
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.ws.addEventListener('message', (res: any) => {
      const resObj = JSON.parse(res.data)
      if (resObj.status === 'registered') {
        this.$router.push('/login')
      }
      if (resObj.status === 'unregistered') {
        this.unregisteredMessage = resObj.message
      }
    })
  },
})
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

.form-reg__alert {
  text-align: center;
  width: 300px;
  margin: 5px;
  font-size: 12pt;
  color: var(--color-2);
}
</style>
