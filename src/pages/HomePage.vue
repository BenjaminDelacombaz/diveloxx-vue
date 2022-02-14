<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <div class="card shadow-2xl">
            <figure>
                <img src="/src/assets/img/sharks.jpg" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    Last dive
                    <div class="badge badge-outline mx-2 badge-primary">
                        NEW
                    </div>
                </h2>
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex">
                        <LocationMarkerIcon class="w-6 h-6 mr-2" />
                        <span>Rivaz Gare</span>
                    </div>
                    <div class="flex">
                        <UsersIcon class="w-6 h-6 mr-2" />
                        <span>Manu, Joëlle</span>
                    </div>
                    <div class="flex">
                        <ArrowCircleDownIcon class="w-6 h-6 mr-2" />
                        <span>54 m</span>
                    </div>
                    <div class="flex">
                        <ClockIcon class="w-6 h-6 mr-2" />
                        <span>85 min</span>
                    </div>
                </div>
                <div class="justify-end card-actions">
                    <button class="btn btn-outline btn-primary">
                        Not the last dive?
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    LocationMarkerIcon,
    ArrowCircleDownIcon,
    ClockIcon,
    UsersIcon,
} from "@heroicons/vue/outline";
import { dives } from '../data/example_data'

console.log(new Date(Math.max(...dives.map(e => new Date(e.date)))))

// const lastDive = dives.
</script>