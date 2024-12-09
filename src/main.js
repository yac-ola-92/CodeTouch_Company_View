import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';
import axiosInstance from './axios';

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.use(router);
app.mount('#app');