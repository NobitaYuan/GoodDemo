<script lang="ts" setup>
import { useDraggable } from "@vueuse/core"
import { vOnClickOutside } from "@vueuse/components"
import { findOutElement } from "@/utils"
import { Close } from "@element-plus/icons-vue"
import inputVue from "./input/index.vue"
import { ref } from "vue"

const logoIcon = new URL("@/assets/images/svg/logo-icon.svg", import.meta.url).href

interface IProps {
    show: boolean
    isClickOutSideClose?: boolean
}
const Props = withDefaults(defineProps<IProps>(), {
    show: false,
    isClickOutSideClose: true,
})
const emit = defineEmits(["update:show"])

const clickOutSide = (e: PointerEvent) => {
    if (!Props.isClickOutSideClose) {
        return
    }
    if (Props.show === true) {
        if (findOutElement(e, ["someClass"])) {
            return
        }
    }
    closeFn()
}
const closeFn = () => {
    emit("update:show", false)
}

// 拖拽逻辑
// 获取当前窗口的宽高
const { innerWidth, innerHeight } = window
const dragEl = ref<HTMLElement | null>(null)

const { x, y, style } = useDraggable(dragEl, {
    initialValue: { x: innerWidth - 364 - 12, y: innerHeight - 572 - 14 },
    preventDefault: true,
})
</script>

<template>
    <div v-on-click-outside="clickOutSide" :style="style" class="chat-dialog-container fixed right-8 bottom-4 w-[364px] h-[572px] bg-[#f5f5f5] rounded shadow-lg overflow-hidden text-white">
        <div class="chat-boxflex flex flex-col h-full">
            <div ref="dragEl" class="header flex gap-[8px] cursor-move items-center relative px-[16px] py-[8px] bg-[#ff4f4c]">
                <div class="icon w-[36px] h-[36px] select-none">
                    <img class="w-full h-full" :src="logoIcon" alt="" />
                </div>
                <div class="title">
                    <div class="text">闪光简历机器人</div>
                </div>
                <div @click="closeFn" class="close cursor-pointer ml-auto flex items-center">
                    <el-icon :size="18" :color="'#fff'">
                        <Close />
                    </el-icon>
                </div>
            </div>
            <div class="body flex-[1] overflow-auto"></div>
            <div class="bottom h-[124px] px-[12px] py-[14px] bg-white">
                <div class="ipt-box">
                    <inputVue />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
