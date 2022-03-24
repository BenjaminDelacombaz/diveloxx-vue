<template>
    <div class="alert shadow-lg alert-error" v-if="error">
        <div>
            <XCircleIcon class="h-6 w-6" />
            <span>{{ error }}</span>
        </div>
    </div>
    <div class="center-items">
        <Loader v-if="isLoading" />
    </div>
    <div v-if="!error && !isLoading">
        <div class="text-right mb-2">
            <label for="edit-dive-modal" class="btn btn-sm btn-outline btn-primary">
                Add a dive
            </label>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div class="card shadow-2xl" v-for="(dive, i) in sortedDives(dives)" :key="dive.id">
                <div class="badge badge-primary text-left ml-4 mt-4">{{ dives.length - i }}</div>
                <div class="card-body items-center text-center py-2">
                    <h2 class="card-title">{{ dive.dive_site.name }}</h2>
                    <p class="text-sm text-gray-400">{{ dive.dateAsString }}</p>
                    <div class="text-left">
                        <div class="flex items-center">
                            <LocationMarkerIcon class="w-6 h-6 mr-2" />
                            <span>{{ dive.dive_site.name }}</span>
                        </div>
                        <div class="flex items-center mt-2">
                            <UsersIcon class="w-6 h-6 mr-2" />
                            <span v-if="dive.divers.length > 0">{{ dive.getDiversAsString(true) }}</span>
                            <span v-else>Solo</span>
                        </div>
                        <div class="flex items-center mt-2">
                            <ArrowCircleDownIcon class="w-6 h-6 mr-2" />
                            <span>{{ dive.depth }} m</span>
                        </div>
                        <div class="flex items-center mt-2">
                            <ClockIcon class="w-6 h-6 mr-2" />
                            <span>{{ dive.duration }} min</span>
                        </div>
                    </div>
                    <div class="text-sm text-gray-400">{{ dive.comments }}</div>
                </div>
                <div class="flex mb-2 mx-4 items-end">
                    <div class="flex-none">
                        <button v-if="dive.canEdit(diver.id)" class="btn btn-sm btn-square btn-primary mr-1" @click="editDive(dive)">
                            <PencilIcon class="h-5 w-5" />
                        </button>
                        <button v-if="dive.canDelete(diver.id)" class="btn btn-sm btn-square btn-primary btn-outline" @click="openDeleteDiveModal(dive)">
                            <TrashIcon class="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <EditDiveModal
            ref="editDiveModal"
            modalId="edit-dive-modal"
            v-on:dive-added="diveAdded"
        />
        <DeleteModal
            ref="deleteDiveModal"
            modalId="delete-dive-modal"
            base-title="Remove a dive"
            v-on:delete-element="doDeleteDive"
        />
    </div>
</template>
<script setup>
import { inject, onMounted, reactive, ref } from 'vue'
import { 
    XCircleIcon,
    PencilIcon,
    TrashIcon,
    LocationMarkerIcon,
    ArrowCircleDownIcon,
    ClockIcon,
    UsersIcon,
} from "@heroicons/vue/outline"
import Loader from "../components/layout/Loader.vue"
import EditDiveModal from '../components/EditDiveModal.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { deleteDive, getDivesByDiver } from '../services/dive.service'

const diver = inject('diver')
const dives = reactive([])
const error = ref(null)
const isLoading = ref(true)
const editDiveModal = ref(null)
const deleteDiveModal = ref(null)

onMounted(async () => {
    try {
        dives.push(...(await getDivesByDiver(diver.value.id)))
    } catch(e) {
        console.error(e)
        error.value = 'An error occurred while retrieving the dives'
    }
    isLoading.value = false
})

const diveAdded = (dive) => dives.push(dive)
const editDive = (dive) => editDiveModal.value.open(dive)
const openDeleteDiveModal = (dive) => deleteDiveModal.value.open(dive, `Delete ${dive.dateAsString} dive`)
const doDeleteDive = async (dive) => {
    try {
        await deleteDive(dive.id)
        let i = dives.indexOf(dive)
        if (i >= 0) {
            dives.splice(i, 1)
        }
    } catch (e) {
        console.error(e)
        error.value = 'An error occurred while deleting the dive'
    }
}
const sortedDives = (array) => dives.sort((a,b) => b.date - a.date)
</script>