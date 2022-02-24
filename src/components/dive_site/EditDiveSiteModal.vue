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
                <!-- Name -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        v-model="state.name"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.name.$error }"
                    />
                    <label class="label" v-for="error of validation.name.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <!-- Description -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Description"
                        v-model="state.description"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.description.$error }"
                    />
                    <label class="label" v-for="error of validation.description.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <!-- Location -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Location"
                        v-model="state.location"
                        class="input input-bordered"
                        :class="{ 'input-error': validation.location.$error }"
                    />
                    <label class="label" v-for="error of validation.location.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <!-- Country -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <select class="select w-full select-bordered" placeholder="Country" v-model="state.country_code">
                        <option v-for="country in countries.default" :value="country.alpha2">{{ country.en }}</option>
                    </select>
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
    import { XCircleIcon } from "@heroicons/vue/outline"
    import { DiveSite } from '../../models/dive_site.model'
    import * as countries from '../../data/countries.json'
    import { createDiveSite } from '../../services/dive_site.service'

    const props = defineProps({
        uid: String,
        diveSite: DiveSite,
    })
    const emit = defineEmits(['dive-site-added'])
    const profile = inject('profile')
    const user = inject('user')
    const state = reactive({
        name: props.diveSite?.name ?? '',
        description: props.diveSite?.description ?? '',
        location: props.diveSite?.location ?? '',
        country_code: props.diveSite?.country_code ?? 'ch',
    })
    const rules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(20) },
        description: { required, minLength: minLength(2) },
        location: { required, minLength: minLength(2), maxLength: maxLength(20) },
        country_code: { required, minLength: minLength(2), maxLength: maxLength(2) },
    }
    const validation = useVuelidate(rules, state, { $autoDirty: true })
    const error = ref(null)
    const isOpen = ref(false)
    const save = async () => {
        if (await validation.value.$validate()) {
            try {
                if (props.diveSite) {
                    /*await updateProfile(user.value.uid, toRaw(state))
                    profile.value.firstname = state.firstname
                    profile.value.lastname = state.lastname*/
                } else {
                    let createdDiveSite = await createDiveSite({
                        ...toRaw(state),
                        owner_id: user.value.uid
                    })
                    let diveSite = new DiveSite(
                        createdDiveSite.id,
                        state.name,
                        state.description,
                        state.location,
                        state.country_code,
                        user.value.uid
                    )
                    diveSite.owner = profile.value 
                    emit('dive-site-added', diveSite)
                }
                isOpen.value = false
            } catch (e) {
                console.error(e)
                error.value = 'An error occurred while saving the dive site'
            }
        }
    }
</script>