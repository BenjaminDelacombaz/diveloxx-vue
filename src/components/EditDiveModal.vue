<template>
    <input type="checkbox" :id="modalId" class="modal-toggle" v-model="isOpen">
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Edit a dive</h3>
            <div class="alert shadow-lg alert-error" v-if="error">
                <div>
                    <XCircleIcon class="h-6 w-6" />
                    <span>{{ error }}</span>
                </div>
            </div>
            <form v-on:submit.prevent="save">
                <!-- Date -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <Datepicker v-model="state.date">
                        <template #dp-input="{ value }">
                            <input
                                type="text"
                                placeholder="Date"
                                :value="value"
                                class="input input-bordered w-full"
                                :class="{ 'input-error': validation.date.$error }"
                            />
                        </template>
                    </Datepicker>
                    <label class="label" v-for="error of validation.date.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <!-- Dive site -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <select 
                        class="select w-full select-bordered"
                        :class="{ 'select-error': validation.dive_site_id.$error }"
                        placeholder="Dive site"
                        v-model="state.dive_site_id"
                    >
                        <option value="" selected disabled>Select a dive site</option>
                        <option v-for="diveSite in diveSites" :value="diveSite.id" :ref="diveSite.id">{{ diveSite.name }} ({{ diveSite.location }} - {{ diveSite.country }})</option>
                    </select>
                    <label class="label" v-for="error of validation.dive_site_id.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <div class="flex flex-col sm:flex-row sm:gap-4">
                    <!-- Depth -->
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text"></span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Depth"
                            v-model="state.depth"
                            class="input input-bordered"
                            :class="{ 'input-error': validation.depth.$error }"
                        />
                        <label class="label" v-for="error of validation.depth.$errors" :key="error.$uid">
                            <span class="label-text-alt">
                                {{ error.$message }}
                            </span>
                        </label>
                    </div>
                    <!-- Duration -->
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text"></span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Duration"
                            v-model="state.duration"
                            class="input input-bordered"
                            :class="{ 'input-error': validation.duration.$error }"
                        />
                        <label class="label" v-for="error of validation.duration.$errors" :key="error.$uid">
                            <span class="label-text-alt">
                                {{ error.$message }}
                            </span>
                        </label>
                    </div>
                </div>
                <!-- Divers -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <div 
                        class="border rounded-lg min-h-12 flex flex-wrap gap-1 px-2 py-2"
                        :class="{ 'border-error': validation.divers_id.$error }"
                        @click="openSelectDiversModal"
                    >
                        <span v-if="!state.divers_id.length">Select some divers</span>
                        <div class="badge flex-shrink-0" v-for="diver_id of state.divers_id" :ref="diver_id">{{ divers.find(d => d.id === diver_id)?.firstname ?? 'Unknown' }}</div>
                    </div>
                    <label class="label" v-for="error of validation.divers_id.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <!-- Tags -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <div 
                        class="border rounded-lg min-h-12 flex flex-wrap gap-1 px-2 py-2"
                        :class="{ 'border-error': validation.tags.$error }"
                        @click="openSelectTagsModal"
                    >
                        <span v-if="!state.tags.length">Select some tags</span>
                        <div class="badge flex-shrink-0" v-for="tag of state.tags" :ref="tag">{{ tag }}</div>
                    </div>
                    <label class="label" v-for="error of validation.tags.$errors" :key="error.$uid">
                        <span class="label-text-alt">
                            {{ error.$message }}
                        </span>
                    </label>
                </div>
                <!-- Comments -->
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <textarea 
                        class="textarea textarea-bordered"
                        :class="{ 'textarea-error': validation.comments.$error }"
                        placeholder="Comments"
                        v-model="state.comments"
                    ></textarea>
                    <label class="label" v-for="error of validation.comments.$errors" :key="error.$uid">
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
    <SelectDiversModal
        ref="selectDiversModal"
        modal-id="select-diver-modal"
        :divers="divers"
        :selected-divers-id="state.divers_id"
        v-on:divers-updated="updateDivers"
        v-if="!isLoading"
    />
    <SelectTagsModal
        ref="selectTagsModal"
        modal-id="select-tags-modal"
        :tags="tags"
        :initial-tags="state.tags"
        v-on:tags-updated="updateTags"
        v-if="!isLoading"
    />
</template>
<script setup>
import { reactive, ref, inject, toRaw, watch, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, numeric, minValue, maxValue } from '@vuelidate/validators'
import { XCircleIcon } from "@heroicons/vue/outline"
import { getDiveSites } from '../services/dive_site.service'
import { getDivers } from '../services/diver.service'
import { createDive, updateDive } from '../services/dive.service'
import SelectDiversModal from './SelectDiversModal.vue'
import SelectTagsModal from './SelectTagsModal.vue'
import Datepicker from '@vuepic/vue-datepicker'
import { Dive } from '../models/dive.model'

const props = defineProps({
    modalId: String,
    tags: Array,
})
const emit = defineEmits(['dive-added', 'dive-updated'])
const diver = inject('diver')
const dive = ref(null)
const diveSites = reactive([])
const divers = reactive([])
const isLoading = ref(true)
const selectDiversModal = ref(null)
const selectTagsModal = ref(null)
const state = reactive({
    comments: '',
    date: (new Date()).toDateInputValue(),
    depth: '',
    dive_site_id: '',
    divers_id: [],
    duration: '',
    tags: [],
})
const rules = {
    comments: {},
    date: { required },
    depth: { required, numeric, minValue: minValue(0), maxValue: maxValue(12000) },
    dive_site_id: { required },
    divers_id: {},
    duration: { required, numeric, minValue: minValue(0) },
    tags: {},
}
const validation = useVuelidate(rules, state, { $autoDirty: true })
const error = ref(null)
const isOpen = ref(false)
const initState = () => {
    state.comments = dive.value?.comments ?? ''
    state.date = dive.value?.date ?? (new Date()).toDateInputValue()
    state.depth = dive.value?.depth ?? ''
    state.dive_site_id = dive.value?.dive_site_id ?? ''
    state.divers_id = dive.value?.divers_id ?? []
    state.duration = dive.value?.duration ?? ''
    state.tags = dive.value?.tags ?? []
}
const open = (diveParam) => {
    dive.value = diveParam
    isOpen.value = true
}
const save = async () => {
    if (await validation.value.$validate()) {
        try {
            if (dive.value) {
                await updateDive(dive.value.id, { ...toRaw(state) })
                dive.value.updateFromFormState(state)
                dive.value.fill(divers, diveSites)
                emit('dive-updated', dive.value)
            } else {
                let createdDive = await createDive({
                    ...toRaw(state),
                    diver_id: diver.value.id
                })
                dive.value = Dive.fromFormState(
                    createdDive.id,
                    diver.value.id,
                    state
                )
                dive.value.fill(divers, diveSites)
                emit('dive-added', dive.value)
            }
            dive.value = null
            isOpen.value = false
        } catch (e) {
            console.error(e)
            error.value = 'An error occurred while saving the dive'
        }
    }
}
const openSelectDiversModal = () => selectDiversModal.value.open()
const openSelectTagsModal = () => selectTagsModal.value.open()
const updateDivers = (selectedDivers) => state.divers_id = selectedDivers.map(d => d.id)
const updateTags = (selectedTags) => state.tags = selectedTags
defineExpose({
    open,  
})
watch(isOpen, (val) => {
    if (!val) dive.value = null
    initState()
    validation.value.$reset()
})
onMounted(async () => {
    try {
        let promises = await Promise.all([getDiveSites(), getDivers()])
        diveSites.push(...promises[0])
        divers.push(...promises[1])
    } catch(e) {
        console.error(e)
        error.value = 'An error occurred while retrieving the dive sites or the divers'
    }
    isLoading.value = false
})
</script>