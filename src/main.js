import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './index.css'
import firebase from "firebase";
import firebaseConfig from '../firebase.config.js'

firebase.initializeApp(firebaseConfig);

createApp(App)
    .use(router)
    .mount('#app')
