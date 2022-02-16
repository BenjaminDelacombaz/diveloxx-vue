<template>
    it works
</template>

<script setup>
    import { inject } from 'vue'

    const profile = inject('profile')

    console.log(profile.value)
</script>