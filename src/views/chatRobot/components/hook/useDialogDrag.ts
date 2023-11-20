import { useDraggable, useStorage } from "@vueuse/core"
import { reactive, ref, watch } from "vue"
import type { IDialogPosition, IOption, ReturnType } from "./type"
import { chatDialogKey } from "@/key/index"

const useDialogDrag = (options: IOption): ReturnType => {
    // 弹窗大小
    const dialogSize = options.dialogSize || { width: 364, height: 572 }
    // 初始位置
    const initPosition = (rate: number = 1) => ({
        x: window.innerWidth - dialogSize.width * rate - 12,
        y: window.innerHeight - dialogSize.height * rate - 14,
    })
    /* ——————————————————————拖拽逻辑——————————————————————*/
    const dialogPositon = useStorage(
        chatDialogKey,
        reactive<IDialogPosition>({
            x: ref(initPosition().x),
            y: ref(initPosition().y),
            isDragging: ref(false),
        }),
    )

    const addDrag = () => {
        // 开始拖拽前，检测一下位置是否正确
        backToRightPostiion()
        const { x, y, isDragging } = useDraggable(options.dragEl, {
            initialValue: { x: dialogPositon.value.x, y: dialogPositon.value.y },
        })
        // @ts-ignore 将初始化位置与useDraggable的位置建立起联系
        dialogPositon.value.x = x
        // @ts-ignore
        dialogPositon.value.y = y
        // @ts-ignore
        dialogPositon.value.isDragging = isDragging
    }

    window.addEventListener("resize", function () {
        backToRightPostiion()
    })

    watch(
        () => dialogPositon.value.isDragging,
        () => {
            backToRightPostiion(0.6)
        },
    )

    // 回到正确的位置
    const backToRightPostiion = (rate: number = 1) => {
        if (dialogPositon.value.x < 0) {
            dialogPositon.value.x = 12
        }
        if (dialogPositon.value.y < 0) {
            dialogPositon.value.y = 12
        }
        if (dialogPositon.value.x > initPosition(rate).x) {
            dialogPositon.value.x = initPosition(rate).x
        }
        if (dialogPositon.value.y > initPosition(rate).y) {
            dialogPositon.value.y = initPosition(rate).y
        }
        if (window.innerWidth < dialogSize.width) {
            options.closeFn()
        }
        if (window.innerHeight < dialogSize.height) {
            options.closeFn()
        }
    }

    return {
        // 弹窗位置
        dialogPositon,
        // 添加拖拽
        addDrag,
        // 回到正确的位置
        backToRightPostiion,
    }
}

export { useDialogDrag }
