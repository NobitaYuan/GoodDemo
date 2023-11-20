import { provide, ref } from "vue"
import { chatCollapseKey } from "@/key/index"
import type { returnType } from "./type"
const useCollapse = (isOnly: boolean = true): returnType => {
    // 折叠数组
    const collapseArr = ref<string[]>([])
    // 添加折叠
    const addCollapse = (collapseName: string) => {
        // 先判断有没有
        const item = collapseArr.value.find((item) => item === collapseName)
        // 有
        if (item) {
            removeCollapse(collapseName)
        }
        // 没有
        else {
            // 判断是不是手风琴模式
            if (isOnly) {
                collapseArr.value = [collapseName]
                return
            }
            collapseArr.value.push(collapseName)
        }
    }
    // 移出折叠项
    const removeCollapse = (collapseName: string) => {
        const index = collapseArr.value.indexOf(collapseName)
        if (index === -1) return
        collapseArr.value.splice(index, 1)
    }
    // 当前激活的折叠项
    const isActive = (name: string) => {
        return collapseArr.value.includes(name)
    }

    // 注入进子组件
    provide(chatCollapseKey, { collapseArr, addCollapse, removeCollapse, isActive })

    return {
        collapseArr,
        addCollapse,
        removeCollapse,
        isActive,
    }
}
export { useCollapse }
