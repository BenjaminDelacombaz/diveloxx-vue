<template>
    <div class="card shadow-2xl">
        <figure>
            <img :src="imgSrc" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                {{ title }} {{ dive.dateAsString }}
            </h2>
            <div class="grid grid-cols-2 gap-2">
                <div class="flex">
                    <MapPinIcon class="w-6 h-6 mr-2" />
                    <span>{{ dive.dive_site.name }}</span>
                </div>
                <div class="flex">
                    <UsersIcon class="w-6 h-6 mr-2" />
                    <span>{{ dive.getDiversAsString(true) }}</span>
                </div>
                <div class="flex">
                    <ArrowDownCircleIcon class="w-6 h-6 mr-2" />
                    <span>{{ dive.depth }} m</span>
                </div>
                <div class="flex">
                    <ClockIcon class="w-6 h-6 mr-2" />
                    <span>{{ dive.duration }} min</span>
                </div>
            </div>
            <div class="justify-end card-actions" v-if="btnText">
                <button class="btn btn-outline btn-primary" @click="emit('btn-clicked')">
                    {{ btnText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Dive } from '../models/dive.model';
import {
    MapPinIcon,
    ArrowDownCircleIcon,
    ClockIcon,
    UsersIcon,
} from "@heroicons/vue/24/outline"

const props = defineProps({
    dive: Dive,
    btnText: String,
    imgSrc: String,
    title: String,
})
const emit = defineEmits(['btn-clicked'])

</script>