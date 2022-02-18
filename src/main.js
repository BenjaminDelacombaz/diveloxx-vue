import { createApp, ref } from 'vue'
import App from './App.vue'
import { router, initGuard } from './router.js'
import './index.css'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase.config.js'
import { getCurrentUser } from './services/auth.service';
import { getProfile } from './services/profile.service';

initializeApp(firebaseConfig)

const user = ref(null)
const profile = ref(null)

user.value = await getCurrentUser()
if (user.value) {
    profile.value = await getProfile(user.value.uid)
}
initGuard(router, user, profile)

createApp(App)
    .use(router)
    .provide('user', user)
    .provide('profile', profile)
    .mount('#app')
