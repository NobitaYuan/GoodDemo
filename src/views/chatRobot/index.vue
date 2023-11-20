<script lang="ts" setup>
import { ref } from "vue"
import clinetBtn from "./components/client-btn.vue"
import chatDialog from "./components/chat-dialog.vue"
import { useStorage } from "@vueuse/core"
const chatActive = useStorage("chatDialogShow", ref(false))

const { innerWidth, innerHeight } = window
console.log(innerWidth, innerHeight)
</script>

<template>
    <div class="robot-container">
        <Teleport to="#dialog">
            <div class="robot-box">
                <!-- 按钮 -->
                <div v-show="!chatActive" @click="chatActive = true" class="clinetBtn fixed z-[999] right-8 bottom-20">
                    <clinetBtn />
                </div>
                <!-- 对话框 -->
                <transition enter-active-class="animate__animated animate__bounceInUp">
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
