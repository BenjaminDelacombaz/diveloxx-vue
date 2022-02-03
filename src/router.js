import * as VueRouter from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})