import type { RemovableRef } from "@vueuse/core"
import type { Ref } from "vue"

// 弹窗尺寸
interface DialogSize {
    width: number
    height: number
}
// 弹窗位置
interface IDialogPosition {
    x: Ref<number>
    y: Ref<number>
    isDragging: Ref<boolean>
}
// 参数
interface IOption {
    dialogSize?: DialogSize
    dragEl: Ref<HTMLElement | null>
    closeFn: () => void
}
// 返回值
interface ReturnType {
    dialogPositon: RemovableRef<{
        x: number
        y: number
        isDragging: boolean
    }>
    addDrag: () => void
    backToRightPostiion: () => void
}
export type { IDialogPosition, IOption, ReturnType }
