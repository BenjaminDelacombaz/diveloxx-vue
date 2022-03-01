<template>
    <div class="radial-progress" :style="`--value:${progress};`"></div>
    <p>Loading<span v-for="index in points" :key="index">.</span></p>
</template>
<script setup>
    import { onMounted, onUnmounted, ref } from 'vue'

    const progress = ref(0)
    const reverse = ref(false)
    let interval = null
    const points = ref(1)

    onMounted(() => {
        interval = setInterval(() => {
            if (progress.value >= 100) reverse.value = true
            if (progress.value <= 0) reverse.value = false
            reverse.value ? progress.value-- : progress.value++
            points.value = Math.round(Number(progress.value / (100 / 3)), 0)
        }, 10)
    })
    onUnmounted(() => {
        clearInterval(interval)
    })
</script>