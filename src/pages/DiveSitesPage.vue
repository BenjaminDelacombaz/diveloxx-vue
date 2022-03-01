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
            <label for="edit-dive-site-modal" class="btn btn-sm btn-outline btn-primary">
                Add a dive site
            </label>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="card shadow-2xl" v-for="diveSite in diveSites" :key="diveSite.id">
                <div class="card-body items-center text-center">
                    <h2 class="card-title">{{ diveSite.name }}</h2>
                    <p class="text-sm text-gray-400">{{ diveSite.location }} ({{ diveSite.country ?? diveSite.country_code }})</p>
                    <p>{{ diveSite.description }}</p>
                </div>
                <div class="flex mb-2 mx-4 items-end">
                    <div class="flex-none">
                        <button v-if="diveSite.canEdit(diver.id)" class="btn btn-sm btn-square btn-primary mr-1" @click="editDiveSite(diveSite)">
                            <PencilIcon class="h-5 w-5" />
                        </button>
                        <button v-if="diveSite.canDelete(diver.id)" class="btn btn-sm btn-square btn-primary btn-outline" @click="openDeleteDiveSiteModal(diveSite)">
                            <TrashIcon class="h-5 w-5" />
                        </button>
                    </div>
                    <p class="text-right text-sm text-gray-400 flex-grow">Owned by {{ diveSite.diver?.anonymizedName ?? 'Unknown' }}</p>
                </div>
            </div>
        </div>
        <EditDiveSiteModal
            ref="editDiveSiteModal"
            uid="edit-dive-site-modal"
            v-on:dive-site-added="diveSiteAdded"
        />
        <DeleteModal
            ref="deleteDiveSiteModal"
            uid="delete-dive-site-modal"
            base-title="Remove a dive site"
            v-on:delete-element="doDeleteDiveSite"
        />
    </div>
</template>
<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import { getDiveSites } from '../services/dive_site.service'
import { XCircleIcon, PencilIcon, TrashIcon } from "@heroicons/vue/outline"
import Loader from "../components/layout/Loader.vue"
import EditDiveSiteModal from '../components/dive_site/EditDiveSiteModal.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { deleteDiveSite } from '../services/dive_site.service'

const diver = inject('diver')
const diveSites = reactive([])
const error = ref(null)
const isLoading = ref(true)
const editDiveSiteModal = ref(null)
const deleteDiveSiteModal = ref(null)

onMounted(async () => {
    try {
        diveSites.push(...(await getDiveSites()))
    } catch(e) {
        console.error(e)
        error.value = 'An error occurred while retrieving the dive sites'
    }
    isLoading.value = false
})

const diveSiteAdded = (diveSite) => diveSites.push(diveSite)
const editDiveSite = (diveSite) => editDiveSiteModal.value.open(diveSite)
const openDeleteDiveSiteModal = (diveSite) => deleteDiveSiteModal.value.open(diveSite, `Delete ${diveSite.name} dive site`)
const doDeleteDiveSite = async (diveSite) => {
    try {
        await deleteDiveSite(diveSite.id)
        let i = diveSites.indexOf(diveSite)
        if (i >= 0) {
            diveSites.splice(i, 1)
        }
    } catch (e) {
        console.error(e)
        error.value = 'An error occurred while deleting the dive site'
    }
}
</script>