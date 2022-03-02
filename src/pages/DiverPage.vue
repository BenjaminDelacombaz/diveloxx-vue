<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card shadow-2xl">
            <div class="card-body items-center center-text">
                <h2 class="card-title">
                    {{ diver?.fullname ?? 'No diver? create one' }}
                </h2>
                <div>{{ user.email }}</div>
                <div class="justify-center card-actions mt-4">
                    <button @click="editDiver()" class="btn btn-outline btn-primary">
                        Edit my diver
                    </button>
                </div>
            </div>
        </div>
        <div class="shadow-2xl stats">
            <div class="stat place-items-center">
                <div class="stat-title">Dives count</div>
                <div class="stat-value">{{ dives.length }}</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">Average dives by years</div>
                <div class="stat-value">{{ dives.length / Object.keys(divesGroupedByYears).length }}</div>
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
    />
</template>

<script setup>
    import { inject, ref } from 'vue'
    import { dives } from '../data/example_data'
    import { getDivesGroupedPerYear } from '../services/dive.service'
    import EditDiverModal from '../components/EditDiverModal.vue'

    const user = inject('user')
    const diver = inject('diver')
    const divesGroupedByYears = getDivesGroupedPerYear(dives)
    const editDiverModal = ref(null)

    const editDiver = () => editDiverModal.value.open(diver.value, true)
</script>