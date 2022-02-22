<template>
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
</template>
<script setup>
import { onMounted, reactive } from 'vue';
import { getDiveSites } from '../services/dive_site.service'

const diveSites = reactive([])

onMounted(async () => {
    diveSites.push(...(await getDiveSites()))
})
</script>