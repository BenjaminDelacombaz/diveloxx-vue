<template>
    <div class="container mx-auto">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {
        test() {
            this.$router.push('/login')
        },
    },
}
</script>