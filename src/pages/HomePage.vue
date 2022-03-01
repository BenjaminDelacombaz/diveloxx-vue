<template>
    <div class="alert shadow-lg alert-warning mb-6" v-if="!diver">
        <div>
            <XCircleIcon class="h-6 w-6" />
            <span>
                You don't have a diver yet, please complete it to use the full application by clicking
                <router-link class="link link-primary" to="/my-diver" >here</router-link>
            </span>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DiveCardHome
            v-if="lastDive"
            :dive="lastDive"
            title="Last dive"
            imgSrc="/src/assets/img/sharks.jpg"
            btnText="Not the last dive?"
            v-on:btnClicked="newDive"
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
import { dives } from '../data/example_data'
import DiveCardHome from "../components/DiveCardHome.vue";
import { inject } from 'vue';
import { XCircleIcon } from "@heroicons/vue/outline"

const lastDive = dives.sort((a,b) => b.date - a.date)[0]
const deepestDive = dives.sort((a,b) => b.depth - a.depth)[0]
const longestDive = dives.sort((a,b) => b.duration - a.duration)[0]
const newDive = () => console.log('Go to new dive')
const diver = inject('diver')
</script>