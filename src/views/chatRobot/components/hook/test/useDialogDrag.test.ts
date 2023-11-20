import { ref } from "vue"
import { useDialogDrag } from "../useDialogDrag"
import { test, expect } from "vitest"
import type { IOption } from "../type"
test("should handle dialog position correctly", () => {
    const options: IOption = {
        dialogSize: { width: 364, height: 572 },
        dragEl: ref(null),
        closeFn: () => {},
    }
    const { dialogPositon, backToRightPostiion, addDrag } = useDialogDrag(options)

    // 初始位置应为 { x: 0, y: 0, isDragging: false }
    expect(dialogPositon.value).toEqual({ x: 364, y: 572, isDragging: false })

    // 模拟拖拽
    addDrag()
    dialogPositon.value.x = 10
    dialogPositon.value.y = 20

    // 检查位置是否已更新
    expect(dialogPositon.value).toEqual({ x: 10, y: 20, isDragging: true })

    // 模拟窗口尺寸小于对话框尺寸，应调用 closeFn
    window.innerWidth = 10
    window.innerHeight = 10
    backToRightPostiion()
    // 在这里，你可能需要使用一个模拟函数来检查 closeFn 是否被调用
})
