import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; //veri paylaşımı
//start app
createApp(App).use(store).mount('#app');