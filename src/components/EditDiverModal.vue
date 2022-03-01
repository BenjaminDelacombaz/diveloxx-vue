<template>
    <input type="checkbox" :id="modalId" class="modal-toggle" v-model="isOpen">
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Edit my diver</h3>
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
                    <label :for="modalId" class="btn btn-error">Cancel</label>
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
    import { updateDiver, createDiver } from '../services/diver.service';
    import { XCircleIcon } from "@heroicons/vue/outline"
    import { Diver } from '../models/diver.model';

    const props = defineProps({
        modalId: String,
    })
    const emit = defineEmits(['diver-updated'])
    const diver = inject('diver')
    const user = inject('user')
    const state = reactive({
        firstname: diver.value?.firstname ?? '',
        lastname: diver.value?.lastname ?? '',
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
                if (diver.value) {
                    await updateDiver(diver.value.id, toRaw(state))
                    diver.value.firstname = state.firstname
                    diver.value.lastname = state.lastname
                } else {
                    let createdDiver = await createDiver(user.value.uid, toRaw(state))
                    diver.value = new Diver(createdDiver.id, state.firstname, state.lastname, user.value.uid, user.value.uid)
                }
                emit('diver-updated')
                isOpen.value = false
            } catch (e) {
                console.error(e)
                error.value = 'An error occurred while saving the diver'
            }
        }
    }
</script>