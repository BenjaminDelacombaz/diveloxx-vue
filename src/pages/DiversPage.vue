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
            <label for="edit-diver-modal" class="btn btn-sm btn-outline btn-primary">
                Add a diver
            </label>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="card shadow-2xl" v-for="diver in divers" :key="diver.id">
                <div class="card-body items-center text-center">
                    <h2 class="card-title">{{ diver.anonymizedName }} <span v-if="auth.diver.uid == diver.uid">(me)</span></h2>
                </div>
                <div class="flex mb-2 mx-4 items-end">
                    <div class="flex-none">
                        <button v-if="diver.canEdit(auth.diver.id, auth.diver.uid)" class="btn btn-sm btn-square btn-primary mr-1" @click="editDiver(diver)">
                            <PencilIcon class="h-5 w-5" />
                        </button>
                        <button v-if="diver.canDelete(auth.diver.id)" class="btn btn-sm btn-square btn-primary btn-outline" @click="openDeleteDiverModal(diver)">
                            <TrashIcon class="h-5 w-5" />
                        </button>
                    </div>
                    <p class="text-right text-sm text-gray-400 flex-grow">Owned by {{ diver.diver?.anonymizedName ?? 'Unknown' }}</p>
                </div>
            </div>
        </div>
    </div>
    <EditDiverModal 
        ref="editDiverModal"
        modalId="edit-diver-modal"
    />
    <DeleteModal
        ref="deleteDiverModal"
        modalId="delete-diver-modal"
        base-title="Remove a diver"
        v-on:delete-element="doDeleteDiver"
    />
</template>
<script setup>
import { inject, onMounted, onUnmounted, reactive, ref } from 'vue'
import { XCircleIcon, PencilIcon, TrashIcon } from "@heroicons/vue/outline"
import Loader from "../components/layout/Loader.vue"
import { deleteDiver, getDivers, subscribeDivers } from '../services/diver.service';
import EditDiverModal from '../components/EditDiverModal.vue'
import DeleteModal from '../components/DeleteModal.vue';

const auth = inject('auth')
const divers = reactive([])
const error = ref(null)
const isLoading = ref(true)
const editDiverModal = ref(null)
const deleteDiverModal = ref(null)
let unsubscribeDivers = () => {}

const editDiver = (diver) => editDiverModal.value.open(diver)
const openDeleteDiverModal = (diver) => deleteDiverModal.value.open(diver, `Delete ${diver.fullname} diver`)
const doDeleteDiver = async (diver) => {
    try {
        await deleteDiver(diver.id)
    } catch (e) {
        console.error(e)
        error.value = 'An error occurred while deleting the diver'
    }
}

onMounted(async () => {
    try {
        unsubscribeDivers = subscribeDivers(() => {
            isLoading.value = false
        }, divers)
    } catch(e) {
        console.error(e)
        error.value = 'An error occurred while retrieving the divers'
        isLoading.value = false
    }
})
onUnmounted(() => {
    unsubscribeDivers()
})
</script>