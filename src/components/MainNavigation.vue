<template>
  <nav class="main-navigation">
    <div class="main-navigation__container">
      <router-link
        v-if="!$store.state.sessions.sessions.auth"
        class="main-navigation__link"
        to="/login"
      >
        Войти
      </router-link>
      <router-link
        v-if="!$store.state.sessions.sessions.auth"
        class="main-navigation__link"
        to="/reg"
      >
        Регистрация
      </router-link>
      <button
        @click="logout"
        v-if="$store.state.sessions.sessions.auth"
        class="main-navigation__link"
      >
        Выйти
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    },
  },
})
</script>

<style lang="css" scoped>
.main-navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 14px 0;
  background-color: var(--color-1);
}

.main-navigation__container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px;
}

.main-navigation__link {
  margin-left: 20px;
  text-decoration: none;
  color: var(--color-2);
  background-color: transparent;
  border: none;
  font-size: 12pt;
  cursor: pointer;
  transition: var(--transition-default);
}

.main-navigation__link:hover, .main-navigation__link:focus {
  color: var(--color-3);
}
</style>
