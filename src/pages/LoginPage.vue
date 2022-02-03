<template>
    <div class="grid place-items-center h-screen">
        <div class="card text-center shadow-2xl bg-base-100">
            <div class="card-body">
                <h2 class="card-title">Diveloxx</h2>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        class="input input-bordered"
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text"></span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        class="input input-bordered"
                    />
                </div>
                <div class="justify-center card-actions">
                    <button class="btn btn-primary">Sign In</button>
                    <button class="btn btn-outline">Forgot password?</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>