import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';
import axiosInstance from './axios';

app.config.globalProperties.$axios = axiosInstance;

const app = createApp(App);
app.use(router);
app.mount('#app');