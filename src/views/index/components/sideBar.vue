<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue"

import { routerFiles } from "@/router/routerFile"
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<template>
    <div class="sideBar">
        <el-menu :default-active="$router.currentRoute.value.fullPath" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item @click="$router.push(item.path)" v-for="item in routerFiles" :key="item.path" :index="item.path">
                <template #title>
                    <el-icon><icon-menu /></el-icon>
                    <span> {{ item.name }} </span>
                </template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<style lang="less" scoped>
.sideBar {
}
</style>
