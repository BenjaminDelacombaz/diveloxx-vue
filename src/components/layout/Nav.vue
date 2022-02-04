<template>
    <div class="navbar mb-2 shadow-lg bg-base-100 rounded-box w-full">
        <div class="flex sm:hidden">
            <div class="dropdown">
                <div tabindex="0" class="btn btn-square btn-ghost">
                    <MenuIcon class="h-6 w-6" />
                </div> 
                <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 border-2">
                    <li v-for="link in links" :key="link.name">
                        <a :href="link.href">{{ link.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-1 px-2 mx-2">
            <span class="text-lg font-bold"> Diveloxx </span>
        </div>
        <div class="hidden items-stretch sm:flex">
            <a class="btn btn-ghost btn-sm rounded-btn" v-for="link in links" :key="link.name" :href="link.href">
                {{ link.name }}
            </a>
        </div>
        <div class="flex-none ml-4">
            <div v-if="getCurrentUser()" class="dropdown dropdown-end">
                <div tabindex="0" class="btn btn-square btn-ghost">
                    <UserIcon class="h-6 w-6" />
                </div> 
                <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 border-2">
                    <li>
                        <a @click="logout()">Sign out</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MenuIcon, UserIcon } from "@heroicons/vue/solid"
import { getCurrentUser, signOut } from '../../services/auth.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const links = [
    {
        name: 'Dives',
        href: '#',
    },
    {
        name: 'Dive sites',
        href: '#',
    },
    {
        name: 'Buddies',
        href: '#',
    },
    {
        name: 'Stats',
        href: '#',
    },
]

const logout = async () => {
    await signOut()
    router.push({ name: 'Login' })
}
</script>