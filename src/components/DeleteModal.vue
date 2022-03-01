<template>
    <input type="checkbox" :id="uid" class="modal-toggle" v-model="isOpen">
    <div class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">{{ title ?? 'Delete an element' }}</h3>
            <div class="alert shadow-lg alert-error" v-if="error">
                <div>
                    <XCircleIcon class="h-6 w-6" />
                    <span>{{ error }}</span>
                </div>
            </div>
            <p>Are you sure you want to remove this element?<br />This action is irreversible.</p>
            <div class="modal-action">
                <label :for="uid" class="btn btn-success">D'ont remove</label>
                <button type="button" class="btn btn-error" @click="confirmDelete">Remove</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { XCircleIcon } from "@heroicons/vue/outline"


const props = defineProps({
    uid: String,
    baseTitle: String
})
const error = ref(null)
const isOpen = ref(false)
const title = ref('')
const elementToDelete = ref(null)

const emit = defineEmits(['delete-element'])
const open = (obj, customTitle = null) => {
    if (customTitle) title.value = customTitle
    elementToDelete.value = obj
    isOpen.value = true
}
const confirmDelete = () => {
    emit('delete-element', elementToDelete.value)
    isOpen.value = false
}

onMounted(() => {
    title.value = props.baseTitle
})
defineExpose({
    open,
})
watch(isOpen, (val) => {
    if (!val) {
        title.value = props.baseTitle
        elementToDelete.value = null
    }
})
</script>