import * as VueRouter from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import { getCurrentUser } from './services/auth.service'

const routes = [
    {
        path: '/',
        component: HomePage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: {
            withoutBase: true,
        }
    },
]

let router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const initGuard = (router) => {
    router.beforeEach(async (to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

        if (requiresAuth && !await getCurrentUser()) {
            next({ name: 'Login' })
        }
        else {
            next()
        }
    })
}

export { router, initGuard }