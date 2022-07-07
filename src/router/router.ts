import LoginPage from '@/pages/LoginPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'
import ChatPage from '@/pages/ChatPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/reg',
    component: RegistrationPage,
  },
  {
    path: '/chat',
    component: ChatPage,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
