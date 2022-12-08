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
    <div class="alert shadow-lg alert-warning mb-6" v-if="auth.hasDiver === false">
        <div>
            <XCircleIcon class="h-6 w-6" />
            <span>
                You don't have a diver yet, please complete it to use the full application by clicking
                <router-link class="link link-primary" to="/my-diver" >here</router-link>
            </span>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="!error && auth.hasDiver && !isLoading">
        <DiveCardHome
            v-if="lastDive"
            :dive="lastDive"
            title="Last dive"
            imgSrc="/src/assets/img/sharks.jpg"
        />
        <DiveCardHome
            v-if="deepestDive"
            :dive="deepestDive"
            title="Deepest dive"
            imgSrc="/src/assets/img/jellyfishes.jpg"
        />
        <DiveCardHome
            v-if="longestDive"
            :dive="longestDive"
            title="Longest dive"
            imgSrc="/src/assets/img/whale.jpg"
        />
    </div>
</template>

<script setup>
import DiveCardHome from "../components/DiveCardHome.vue";
import { inject, onMounted, reactive, ref } from 'vue';
import { XCircleIcon } from "@heroicons/vue/24/outline"
import Loader from "../components/layout/Loader.vue"
import { getDivesByDiver } from "../services/dive.service";

const auth = inject('auth')
const dives = reactive([])
const lastDive = ref(null)
const deepestDive = ref(null)
const longestDive = ref(null)
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
    try {
        if (auth.value.diver) {
            dives.push(...(await getDivesByDiver(auth.value.diver.id)))
            lastDive.value = dives.sort((a,b) => b.date - a.date)[0]
            deepestDive.value = dives.sort((a,b) => b.depth - a.depth)[0]
            longestDive.value = dives.sort((a,b) => b.duration - a.duration)[0]
        }
    } catch(e) {
        console.error(e)
        error.value = 'An error occurred while retrieving the dives'
    }
    isLoading.value = false
})
</script>