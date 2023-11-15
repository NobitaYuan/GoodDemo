<script setup lang="ts">
import { RouterView } from "vue-router"
import layOut from "@/layout/index.vue"
</script>

<template>
    <div class="app">
        <layOut>
            <RouterView />
        </layOut>
    </div>
</template>

<style scoped lang="less">
.app {
    height: 100%;
}
</style>
