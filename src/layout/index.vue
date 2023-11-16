<script lang="ts" setup>
import { RouterView } from "vue-router"
import sideBar from "./components/sideBar.vue"
import headCom from "./components/headView.vue"
</script>

<template>
    <div class="common-layout">
        <el-container class="common-layout-container">
            <el-header class="hd">
                <headCom></headCom>
            </el-header>
            <el-container class="bd">
                <el-aside class="aside">
                    <sideBar />
                </el-aside>
                <el-main class="main">
                    <RouterView v-slot="{ Component, route }">
                        <transition :mode="'out-in'" enter-active-class="animate__animated animate__bounceInDown" leave-active-class="animate__animated animate__bounceOutUp">
                            <keep-alive>
                                <component :is="Component" :key="route.name" />
                            </keep-alive>
                        </transition>
                    </RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="less" scoped>
.common-layout {
    height: 100%;
    padding: 16px;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;

    .common-layout-container {
        height: 100%;
        grid-gap: 10px;
        gap: 10px;

        .hd {
            padding: 0;
        }

        .bd {
            grid-gap: 10px;
            gap: 10px;
            overflow: auto;

            .aside {
                width: 180px;
            }

            .main {
                position: relative;
                border-radius: 4px;
                box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
                padding: 8px;
                min-height: 900px;
                overflow: auto;
                background-color: var(--el-card-bg-color);
                color: var(--el-text-color-primary);
                transition: var(--el-transition-duration);
                border: solid 1px var(--el-menu-border-color);
            }
        }
    }
}

// 动画速度
.animate__animated {
    --animate-duration: 0.6s;
}
</style>
