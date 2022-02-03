<template>
    <div class="grid place-items-center h-screen">
        <div class="card text-center shadow-2xl bg-base-100">
            <div class="card-body">
                <h2 class="card-title">Diveloxx</h2>
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
                    <button class="btn btn-primary w-48" @click="login">   
                        Sign In
                    </button>
                    <button class="btn btn-outline btn-primary w-48">
                        Create an account
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { signIn } from '../services/auth.service.js'

    const email = ref('')
    const password = ref('')

    const login = async () => {
        try {
            let userCredential = await signIn(email.value, password.value)
            console.log('Successfully logged in!');
            console.log(userCredential)
        } catch (error) {
            console.log(error.code)
            alert(error.message);
        }   
    }
</script>

<style>
</style>