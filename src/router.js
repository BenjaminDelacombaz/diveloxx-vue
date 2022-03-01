import * as VueRouter from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import PathNotFoundPage from './pages/PathNotFoundPage.vue'
import DiverPage from './pages/DiverPage.vue'
import SignOutPage from './pages/SignOutPage.vue'
import DiveSitesPage from './pages/DiveSitesPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
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
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: {
            withoutBase: true,
        }
    },
    {
        path: '/sign-out',
        name: 'SignOut',
        component: SignOutPage,
        meta: {
            requiresAuth: true,
            withoutBase: true,
        }
    },
    {
        path: '/my-diver',
        name: 'MyDiver',
        component: DiverPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/dive-sites',
        name: 'DiveSites',
        component: DiveSitesPage,
        meta: {
            requiresAuth: true,
            requiresDiver: true,
        }
    },
    // Always last
    {
        path: '/:pathMatch(.*)*',
        component: PathNotFoundPage,
        meta: {
            withoutBase: true,
        }
    },
]

let router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const initGuard = (router, user, diver) => {
    router.beforeEach(async (to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const requiresDiver = to.matched.some(record => record.meta.requiresDiver);

        if (requiresAuth && !user.value) {
            next({ name: 'Login' })
        }
        else {
            if (requiresDiver && !diver.value) {
                next({ name: 'MyDiver' })
            } else {
                next()
            }
        }
    })
}

export { router, initGuard }