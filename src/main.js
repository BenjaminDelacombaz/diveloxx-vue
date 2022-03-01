import { createApp, ref } from 'vue'
import App from './App.vue'
import { router, initGuard } from './router.js'
import './index.css'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase.config.js'
import { getCurrentUser } from './services/auth.service';
import { getDiver } from './services/diver.service';

initializeApp(firebaseConfig)

const user = ref(null)
const diver = ref(null)

user.value = await getCurrentUser()
if (user.value) {
    diver.value = await getDiver(user.value.uid)
}
initGuard(router, user, diver)

createApp(App)
    .use(router)
    .provide('user', user)
    .provide('diver', diver)
    .mount('#app')
