<script lang="ts" setup>
import { Menu as IconMenu } from "@element-plus/icons-vue"

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
            <el-menu-item class="item" @click="$router.push(item.path)" v-for="item in routerFiles" :key="item.path" :index="item.path">
                <template #title>
                    <el-icon><icon-menu /></el-icon>
                    <span class="span"> {{ item.name }} </span>
                </template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<style lang="less" scoped>
.sideBar {
    height: 100%;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

    .el-menu-vertical-demo {
        height: 100%;
        border: solid 1px var(--el-menu-border-color);
        overflow: auto;

        .item {
            padding: 0px 16px !important;

            .span {
                // 文字单行不换行，超出部分省略号显示
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: inline-block;
                width: 100%;
            }
        }
    }
}
</style>
