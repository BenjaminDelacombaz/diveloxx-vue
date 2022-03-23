import { createApp, ref } from 'vue'
import App from './App.vue'
import { router, initGuard } from './router.js'
import './index.css'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase.config.js'
import { getCurrentUser } from './services/auth.service';
import { getDiver } from './services/diver.service';
import '@vuepic/vue-datepicker/dist/main.css'

initializeApp(firebaseConfig)

const user = ref(null)
const diver = ref(null)

user.value = await getCurrentUser()
if (user.value) {
    diver.value = await getDiver(user.value.uid)
}
initGuard(router, user, diver)

Date.prototype.toDateInputValue = (function() {
    return new Date(this.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)
});

createApp(App)
    .use(router)
    .provide('user', user)
    .provide('diver', diver)
    .mount('#app')
