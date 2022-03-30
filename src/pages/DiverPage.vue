<template>
    <div class="alert shadow-lg alert-error" v-if="error">
        <div>
            <XCircleIcon class="h-6 w-6" />
            <span>{{ error }}</span>
        </div>
    </div>
    <div class="center-items" v-if="isLoading">
        <Loader />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="!isLoading">
        <div class="card shadow-2xl">
            <div class="card-body items-center center-text">
                <h2 class="card-title">
                    {{ auth.diver?.fullname ?? 'No diver? create one' }}
                </h2>
                <div>{{ auth.user.email }}</div>
                <div class="justify-center card-actions mt-4">
                    <button @click="editDiver()" class="btn btn-outline btn-primary">
                        Edit my diver
                    </button>
                </div>
            </div>
        </div>
        <div class="shadow-2xl stats" v-if="!isLoading && auth.hasDiver && dives">
            <div class="stat place-items-center">
                <div class="stat-title">Dives count</div>
                <div class="stat-value">{{ dives.length }}</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">Average dives by years</div>
                <div class="stat-value">{{ dives.length > 0 ? dives.length / Object.keys(divesGroupedByYears).length : 0 }}</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">Dives this year</div>
                <div class="stat-value">{{ divesGroupedByYears[(new Date()).getFullYear()]?.length ?? 0 }}</div>
            </div>
        </div>
    </div>
    <EditDiverModal 
        ref="editDiverModal"
        modalId="edit-diver-modal"
        v-on:diver-added="init"
    />
</template>

<script setup>
    import { inject, onMounted, ref } from 'vue'
    import { getDivesByDiver, getDivesGroupedPerYear } from '../services/dive.service'
    import EditDiverModal from '../components/EditDiverModal.vue'
    import Loader from '../components/layout/Loader.vue'
    import { XCircleIcon } from "@heroicons/vue/outline"

    const auth = inject('auth')
    const dives = ref(null)
    const divesGroupedByYears = ref(null)
    const editDiverModal = ref(null)
    const isLoading = ref(true)
    const error = ref(null)

    const editDiver = () => editDiverModal.value.open(auth.value.diver, true)
    const init = async () => {
        try {
            if (auth.value.diver) {
                dives.value = (await getDivesByDiver(auth.value.diver.id))
                divesGroupedByYears.value = getDivesGroupedPerYear(dives.value)
            }
        } catch (e) {
            console.error(e)
            error.value = 'An error occurred while retrieving the dives'
        }
        isLoading.value = false
    }

    onMounted(async () => {
        init()
    })
</script>