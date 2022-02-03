import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './index.css'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase.config.js'

initializeApp(firebaseConfig)

createApp(App)
    .use(router)
    .mount('#app')
