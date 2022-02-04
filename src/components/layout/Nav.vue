<template>
    <div class="navbar mb-2 shadow-lg bg-base-100 rounded-box w-full">
        <div class="flex sm:hidden">
            <button class="btn btn-square btn-ghost">
                <MenuIcon class="h-6 w-6" />
            </button>
        </div>
        <div class="flex flex-1 px-2 mx-2">
            <span class="text-lg font-bold"> Diveloxx </span>
        </div>
        <div class="hidden items-stretch sm:flex">
            <a class="btn btn-ghost btn-sm rounded-btn">Dives</a>
            <a class="btn btn-ghost btn-sm rounded-btn">Dive sites</a>
            <a class="btn btn-ghost btn-sm rounded-btn">Buddies</a>
            <a class="btn btn-ghost btn-sm rounded-btn">Stats</a>
        </div>
        <div class="flex-none ml-4">
            <button class="btn btn-square btn-ghost">
                <UserIcon class="h-6 w-6" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { MenuIcon, UserIcon } from "@heroicons/vue/solid";
</script>