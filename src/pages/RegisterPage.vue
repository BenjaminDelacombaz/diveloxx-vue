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
            <form v-on:submit.prevent="register">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        v-model="state.email"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.email.$error }"
                    />
                    <label class="label" v-for="error of validation.email.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Confirm email"
                        v-model="state.confirmEmail"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.confirmEmail.$error }"
                    />
                    <label class="label" v-for="error of validation.confirmEmail.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        v-model="state.password"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.password.$error }"
                    />
                    <label class="label" v-for="error of validation.password.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        v-model="state.confirmPassword"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.confirmPassword.$error }"
                    />
                    <label class="label" v-for="error of validation.confirmPassword.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <div class="justify-center card-actions mt-10">
                    <button class="btn btn-primary w-48">   
                        Create account
                    </button>
                    <router-link to="/login" custom v-slot="{ navigate, href }">
                        <a class="btn btn-outline btn-primary w-48" :href="href" @click="navigate">
                            Already have an account?
                        </a>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { reactive, toRef, ref } from 'vue'
    import useVuelidate from '@vuelidate/core'
    import { required, email, sameAs, minLength } from '@vuelidate/validators'
    import { containsLowercaseLetter, containsUppercaseLetter, containsDigit, containsSpecialChar } from '../tools/validators'
    import { createUser } from '../services/auth.service.js'
    import { useRouter } from 'vue-router'
    import { getMessageFromCode } from '../tools/errors'
    import { XCircleIcon } from "@heroicons/vue/24/outline"

    const router = useRouter()
    const state = reactive({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    })
    const rules = {
        email: { required, email },
        confirmEmail:  { required, sameAs: sameAs(toRef(state, 'email')) },
        password: {
            required,
            minLength: minLength(8),
            containsLowercaseLetter,
            containsUppercaseLetter,
            containsDigit,
            containsSpecialChar,
        },
        confirmPassword: { required, sameAs: sameAs(toRef(state, 'password')) },
    }
    const validation = useVuelidate(rules, state, { $autoDirty: true })
    const error = ref(null)
    const register = async () => {
        let isFormValid = await validation.value.$validate()
        if (isFormValid) {
            try {
                await createUser(state.email, state.password)
                router.push({ name: 'Home' })
            } catch (e) {
                error.value = e
            }
        }
    }
</script>

<style>
</style>