import { createApp } from 'vue'
import App from './App.vue'
import { router, initGuard } from './router.js'
import './index.css'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase.config.js'

initializeApp(firebaseConfig)

initGuard(router)

createApp(App)
    .use(router)
    .mount('#app')
