<template>
    <input type="checkbox" :id="uid" class="modal-toggle" v-model="isOpen">
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Edit my profile</h3>
            <div class="alert shadow-lg alert-error" v-if="error">
                <div>
                    <XCircleIcon class="h-6 w-6" />
                    <span>{{ error }}</span>
                </div>
            </div>
            <form v-on:submit.prevent="save">
                <!-- Firstname -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Firstname"
                        v-model="state.firstname"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.firstname.$error }"
                    />
                    <label class="label" v-for="error of validation.firstname.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <!-- Lastname -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Lastname"
                        v-model="state.lastname"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.lastname.$error }"
                    />
                    <label class="label" v-for="error of validation.lastname.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <div class="modal-action">
                    <label :for="uid" class="btn btn-error">Cancel</label>
                    <button class="btn btn-success">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
    import { reactive, ref, inject, toRaw } from 'vue'
    import useVuelidate from '@vuelidate/core'
    import { required, minLength, maxLength } from '@vuelidate/validators'
    import { updateProfile, createProfile } from '../../services/profile.service';
    import { XCircleIcon } from "@heroicons/vue/outline"
    import { Profile } from '../../models/profile.model';

    const props = defineProps({
        uid: String,
    })
    const emit = defineEmits(['profile-updated'])
    const profile = inject('profile')
    const user = inject('user')
    const state = reactive({
        firstname: profile.value?.firstname ?? '',
        lastname: profile.value?.lastname ?? '',
    })
    const rules = {
        firstname: { required, minLength: minLength(2), maxLength: maxLength(20) },
        lastname:  { required, minLength: minLength(2), maxLength: maxLength(20) },
    }
    const validation = useVuelidate(rules, state, { $autoDirty: true })
    const error = ref(null)
    const isOpen = ref(false)
    const save = async () => {
        if (await validation.value.$validate()) {
            try {
                if (profile.value) {
                    await updateProfile(user.value.uid, toRaw(state))
                    profile.value.firstname = state.firstname
                    profile.value.lastname = state.lastname
                } else {
                    await createProfile(user.value.uid, toRaw(state))
                    profile.value = new Profile(null, state.firstname, state.lastname)
                }
                emit('profile-updated')
                isOpen.value = false
            } catch (e) {
                console.error(e)
                error.value = 'An error occurred while saving the profile'
            }
        }
    }
</script>