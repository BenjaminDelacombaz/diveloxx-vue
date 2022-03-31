<template>
    <input type="checkbox" :id="modalId" class="modal-toggle" v-model="isOpen">
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Select tags</h3>
            <div>
                <div class="form-control">
                    <div class="input-group">
                        <input type="text" placeholder="Tag name" v-model="newTag" class="input input-bordered w-full">
                        <button class="btn btn-square btn-success" @click="addTag">
                            <PlusIcon class="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div class="flex flex-wrap h-96 gap-4 overflow-auto p-4">
                    <div 
                        class="card shadow-xl flex-shrink-0 flex-grow w-full md:w-1/3 bg-success"
                        v-for="tag of sortedTags(selectedTags)" :ref="tag" 
                        @click="selectTag(tag)"
                    >
                        <div class="card-body">
                            <h2 class="card-title">{{ tag }}</h2>
                        </div>
                    </div>
                    <div 
                        class="card shadow-xl flex-shrink-0 flex-grow w-full md:w-1/3"
                        v-for="tag of sortedTags(unselectedTags)" :ref="tag"
                        @click="selectTag(tag)"
                    >
                        <div class="card-body">
                            <h2 class="card-title">{{ tag }}</h2>
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
import { PlusIcon } from "@heroicons/vue/outline"

const props = defineProps({
    modalId: String,
    tags: Array,
    initialTags: Array,
})
const newTag = ref('')
const unselectedTags = reactive([])
const selectedTags = reactive([])
const emit = defineEmits(['tags-updated'])
const isOpen = ref(false)
const open = () => isOpen.value = true
const sortedTags = (array) => {
    return array.sort((a, b) => {
        let fa = a.toLowerCase()
        let fb = b.toLowerCase()
        return (fa < fb) ? -1 : (fa > fb) ? 1 : 0
    })
}
const addTag = () => {
    selectedTags.push(newTag.value)
}
const selectTag = (tag) => {
    let selectedIndex = selectedTags.indexOf(tag)
    let unselectedIndex = unselectedTags.indexOf(tag)
    if (selectedIndex >= 0) {
        unselectedTags.push(tag)
        selectedTags.splice(selectedIndex, 1)
    } else {
        selectedTags.push(tag)
        unselectedTags.splice(unselectedIndex, 1)
    }
}
const apply = () => {
    emit('tags-updated', [...selectedTags])
    isOpen.value = false
}
const init = () => {
    unselectedTags.splice(0)
    selectedTags.splice(0)
    unselectedTags.push(...props.tags)
    if (props.initialTags) {
        for (const tag of props.initialTags) {
            let tagToSelect = unselectedTags.find(t => t == tag)
            if (tagToSelect) {
                selectTag(tagToSelect)
            } else {
                selectedTags.push(tag)
            }
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