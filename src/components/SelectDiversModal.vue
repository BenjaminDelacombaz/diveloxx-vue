<template>
    <input type="checkbox" :id="modalId" class="modal-toggle" v-model="isOpen">
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Select divers</h3>
            <div>
                <div class="flex flex-wrap h-96 gap-4 overflow-auto p-4">
                    <div 
                        class="card shadow-xl flex-shrink-0 flex-grow w-full md:w-1/3 bg-success"
                        v-for="diver of sortedDivers(selectedDivers)" :ref="diver.id" 
                        @click="selectDiver(diver)"
                    >
                        <div class="card-body">
                            <h2 class="card-title">{{ diver.fullname }}</h2>
                        </div>
                    </div>
                    <div 
                        class="card shadow-xl flex-shrink-0 flex-grow w-full md:w-1/3"
                        v-for="diver of sortedDivers(unselectedDivers)" :ref="diver.id"
                        @click="selectDiver(diver)"
                    >
                        <div class="card-body">
                            <h2 class="card-title">{{ diver.fullname }}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <label :for="modalId" class="btn btn-error">Cancel</label>
                <button class="btn btn-success" @click="apply()">Apply</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
    modalId: String,
    divers: Array,
    selectedDiversId: Array,
})
const unselectedDivers = reactive([])
const selectedDivers = reactive([])
const emit = defineEmits(['divers-updated'])
const isOpen = ref(false)
const open = () => isOpen.value = true
const sortedDivers = (array) => {
    return array.sort((a, b) => {
        let fa = a.fullname.toLowerCase()
        let fb = b.fullname.toLowerCase()
        return (fa < fb) ? -1 : (fa > fb) ? 1 : 0
    })
}
const selectDiver = (diver) => {
    let selectedIndex = selectedDivers.indexOf(diver)
    let unselectedIndex = unselectedDivers.indexOf(diver)
    if (selectedIndex >= 0) {
        unselectedDivers.push(diver)
        selectedDivers.splice(selectedIndex, 1)
    } else {
        selectedDivers.push(diver)
        unselectedDivers.splice(unselectedIndex, 1)
    }
}
const apply = () => {
    emit('divers-updated', selectedDivers)
    isOpen.value = false
}
const init = () => {
    unselectedDivers.splice(0)
    selectedDivers.splice(0)
    unselectedDivers.push(...props.divers)
    if (props.selectedDiversId) {
        for (const diverId of props.selectedDiversId) {
            let diverToSelect = unselectedDivers.find(diver => diver.id == diverId)
            if (diverToSelect) selectDiver(diverToSelect)
        }
    }
}
defineExpose({
    open,  
})
watch(isOpen, (val) => {
    // When isOpen change
    init()
})
</script>