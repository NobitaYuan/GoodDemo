<script lang="ts" setup>
import { ref } from "vue"
import clinetBtn from "./components/client-btn.vue"
import chatDialog from "./components/chat-dialog.vue"
import { useStorage } from "@vueuse/core"
const chatActive = useStorage("chatDialogShow", ref(false))
</script>

<template>
    <div class="robot-container">
        <Teleport to="#dialog">
            <div class="robot-box">
                <!-- 按钮 -->
                <transition enter-active-class="animate__animated animate__bounceInUp" leave-active-class="animate__animated animate__zoomOut">
                    <clinetBtn v-show="!chatActive" @click="chatActive = true" />
                </transition>
                <!-- 对话框 -->
                <transition enter-active-class="animate__animated animate__bounceInUp" leave-active-class="animate__animated animate__bounceOutDown">
                    <chatDialog v-show="chatActive" v-model:show="chatActive" :is-click-out-side-close="true" />
                </transition>
            </div>
        </Teleport>
    </div>
</template>

<style lang="less" scoped>
// 动画速度
.animate__animated {
    --animate-duration: 0.6s;
}
</style>
