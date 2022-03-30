<template>
    <div class="card text-center shadow-2xl bg-base-100">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Diveloxx</h2>
            <div class="alert shadow-lg alert-error" v-if="error">
                <div>
                    <XCircleIcon class="h-6 w-6" />
                    <span>{{ getMessageFromCode(error.code) }}</span>
                </div>
            </div>
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
    import { ref, inject } from 'vue'
    import { signIn } from '../services/auth.service.js'
    import { useRouter } from 'vue-router'
    import { XCircleIcon } from "@heroicons/vue/outline"
    import { getMessageFromCode } from '../tools/errors'

    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const auth = inject('auth')

    const login = async () => {
        try {
            await signIn(email.value, password.value)
            await auth.value.init()
            router.push({ name: 'Home' })
        } catch (e) {
            error.value = e
        }   
    }
</script>

<style>
</style>