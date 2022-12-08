<template>
    <div class="navbar mb-2 shadow-lg bg-base-100 rounded-box w-full">
        <div class="flex sm:hidden">
            <div class="dropdown">
                <div tabindex="0" class="btn btn-square btn-ghost">
                    <Bars3Icon class="h-6 w-6" />
                </div> 
                <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 border-2">
                    <li v-for="link in links" :key="link.name">
                        <router-link :to="link.href">
                            {{ link.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-1 px-2 mx-2">
            <router-link class="text-lg font-bold" to="/">Diveloxx</router-link>
        </div>
        <div class="hidden items-stretch sm:flex">
            <router-link class="btn btn-ghost btn-sm rounded-btn" v-for="link in links" :key="link.name" :to="link.href">
                {{ link.name }}
            </router-link>
        </div>
        <div class="flex-none">
            <div v-if="auth.user" class="dropdown dropdown-end">
                <div tabindex="0" class="avatar placeholder">
                    <div class="bg-primary text-primary-content rounded-lg w-10 cursor-pointer">
                        <span v-if="auth.hasDiver">{{ auth.diver.firstname.charAt(0) }}{{ auth.diver.lastname.charAt(0) }}</span>
                        <UserIcon v-else class="h-5 w-5" />
                    </div>
                </div> 
                <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 border-2">
                    <li class="menu-title">
                        <span>{{ auth.user.email }}</span>
                    </li>
                    <li>
                        <router-link to="/my-diver" >My diver</router-link>
                    </li>
                    <li>
                        <a @click="logout()">Sign out</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { inject } from 'vue'
    import { Bars3Icon, UserIcon } from "@heroicons/vue/24/solid"
    import { useRouter } from 'vue-router'

    const auth = inject('auth')
    const router = useRouter()
    const links = [
        {
            name: 'Dives',
            href: '/dives',
        },
        {
            name: 'Dive sites',
            href: '/dive-sites',
        },
        {
            name: 'Divers',
            href: '/divers',
        },
        {
            name: 'Stats',
            href: '#',
        },
    ]

    const logout = async () => {
        router.push({ name: 'SignOut' })
    }
</script>