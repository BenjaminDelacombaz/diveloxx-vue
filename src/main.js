import { createApp, ref } from 'vue'
import App from './App.vue'
import { router, initGuard } from './router.js'
import './index.css'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase.config.js'
import { Auth } from './models/auth.model'
import '@vuepic/vue-datepicker/dist/main.css'

initializeApp(firebaseConfig)

const auth = ref(new Auth())
await auth.value.init()

initGuard(router, auth)

Date.prototype.toDateInputValue = (function() {
    return new Date(this.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)
});

createApp(App)
    .use(router)
    .provide('auth', auth)
    .mount('#app')
