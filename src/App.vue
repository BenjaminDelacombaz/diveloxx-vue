<template>
    <div class="container mx-auto">
        <div v-if="!$route.meta.withoutBase" class="min-h-screen p-6">
            <Nav />
            <div class="card text-center shadow-2xl bg-base-100 w-full p-6">
                <router-view></router-view>
            </div>
        </div>
        <div v-if="$route.meta.withoutBase" class="grid place-items-center h-screen p-6">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import Nav from './components/layout/Nav.vue'
</script>