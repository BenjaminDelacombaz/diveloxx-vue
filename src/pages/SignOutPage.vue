<template>
    <div class="card text-center shadow-2xl bg-base-100">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Diveloxx</h2>
            <p>
                You have successfully logged out<br />
                You will be automatically redirected to the login page in {{ counter }} seconds<br />
            </p>
            <router-link v-if="counter <= 0" to="/login" custom v-slot="{ navigate, href }">
                <a class="link link-primary mt-4" :href="href" @click="navigate">
                    Click here to be redirected manually
                </a>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import { signOut } from '../services/auth.service';

const router = useRouter()
const counter = ref(5);
const user = inject('user')
const profile = inject('profile')
let interval = null

user.value = null
profile.value = null
signOut().then(() => {
    interval = setInterval(() => {
        counter.value--
        if (counter.value <= 0) {
            router.replace({ name: 'Login' })
        }
    }, 1000)
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>

<style>
</style>