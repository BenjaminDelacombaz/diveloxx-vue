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
                    <p class="text-sm text-gray-400">{{ diveSite.country ?? diveSite.country_code }}</p>
                    <p>{{ diveSite.description }}</p>
                </div>
                <div class="text-right mb-2 mr-6 text-sm text-gray-400">
                    <p>Owned by {{ diveSite.owner?.anonymizedName ?? 'Unknown' }}</p> 
                </div>
            </div>
        </div>
        <EditDiveSiteModal 
            uid="edit-dive-site-modal"
            v-on:dive-site-added="diveSiteAdded"
        />
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getDiveSites } from '../services/dive_site.service'
import { XCircleIcon } from "@heroicons/vue/outline"
import Loader from "../components/layout/Loader.vue"
import EditDiveSiteModal from '../components/dive_site/EditDiveSiteModal.vue';

const diveSites = reactive([])
const error = ref(null)
const isLoading = ref(true)

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
</script>