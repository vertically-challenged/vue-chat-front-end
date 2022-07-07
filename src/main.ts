import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import uiComponents from '@/components/UI/index'

const app = createApp(App)

uiComponents.forEach((component) => {
  app.component(component.name, component)
})

app.use(router).mount('#app')
