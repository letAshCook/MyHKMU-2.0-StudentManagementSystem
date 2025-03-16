import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import authService from './services/auth';

const app = createApp(App);

// Handle OAuth callback
authService.handleAuthCallback();

app.use(router);
app.mount('#app');