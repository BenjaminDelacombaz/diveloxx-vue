<template>
    <div class="card text-center shadow-2xl bg-base-100">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Diveloxx</h2>
            <form v-on:submit.prevent="login">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        v-model="email"
                        class="input input-bordered"
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        class="input input-bordered"
                    />
                    <label class="label">
                        <a href="#" class="label-text-alt link link-primary">Forgotten password?</a>
                    </label>
                </div>
                <div class="justify-center card-actions mt-10">
                    <button class="btn btn-primary w-48">   
                        Sign In
                    </button>
                    <router-link to="/register" custom v-slot="{ navigate, href }">
                        <a class="btn btn-outline btn-primary w-48" :href="href" @click="navigate">
                            Create an account
                        </a>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { signIn } from '../services/auth.service.js'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const login = async () => {
        try {
            let userCredential = await signIn(email.value, password.value)
            router.push({ name: 'Home' })
        } catch (error) {
            console.log(error.code)
            alert(error.message);
        }   
    }
</script>

<style>
</style>