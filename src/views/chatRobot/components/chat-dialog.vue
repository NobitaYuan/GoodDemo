<script lang="ts" setup>
import { ref } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import { findOutElement } from "@/utils"
import { Close } from "@element-plus/icons-vue"
import inputVue from "./input/index.vue"
import qAndA from "./q_a/index.vue"
import { useDialogDrag } from "./hook/useDialogDrag"

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

/* ________________拖拽________________ */
const dialogSize = {
    width: 364,
    height: 572,
}
const dragEl = ref<HTMLElement | null>(null)
const { dialogPositon: Point, addDrag } = useDialogDrag({ dialogSize, dragEl, closeFn })
addDrag()
</script>

<template>
    <div
        v-on-click-outside="clickOutSide"
        :style="{ left: Point.x + 'px', top: Point.y + 'px', width: dialogSize.width + 'px', height: dialogSize.height + 'px' }"
        class="chat-dialog-container fixed z-[999] right-0 bottom-0 bg-[#f5f5f5] rounded shadow-lg overflow-hidden text-white"
    >
        <div class="chat-box flex flex-col h-full">
            <div ref="dragEl" class="header select-none flex gap-[12px] cursor-move items-center relative px-[16px] py-[8px] bg-[#ff4f4c]">
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
            <div class="body flex-[1] px-[12px] py-[6px]">
                <div class="min-h-[800px]">
                    <qAndA />
                </div>
            </div>
            <div class="bottom h-[124px] px-[12px] py-[14px] bg-white">
                <div class="ipt-box">
                    <inputVue />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.chat-dialog-container {
    .chat-box {
        .header {
        }

        .body {
            overflow-y: overlay;
        }

        .bottom {
            border-top: 1px solid #eee;
        }
    }
}
</style>
