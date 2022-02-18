import * as VueRouter from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import PathNotFoundPage from './pages/PathNotFoundPage.vue'
import ProfilePage from './pages/profile/ProfilePage.vue'
import SignOutPage from './pages/SignOutPage.vue'

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
        path: '/profile',
        name: 'Profile',
        component: ProfilePage,
        meta: {
            requiresAuth: true,
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

const initGuard = (router, user, profile) => {
    router.beforeEach(async (to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const requiresProfile = to.matched.some(record => record.meta.requiresProfile);

        if (requiresAuth && !user.value) {
            next({ name: 'Login' })
        }
        else {
            if (requiresProfile && !profile.value) {
                next({ name: 'Profile' })
            } else {
                next()
            }
        }
    })
}

export { router, initGuard }