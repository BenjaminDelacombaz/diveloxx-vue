<template>
    <div class="card text-center shadow-2xl bg-base-100">
        <div class="card-body items-center text-center">
            <h2 class="card-title mb-6">Sorry, this page doesn't exists!</h2>
            <router-link to="/" custom v-slot="{ navigate, href }">
                <a class="btn btn-primary w-48" :href="href" @click="navigate">
                    Return to home
                </a>
            </router-link>
        </div>
    </div>
</template>