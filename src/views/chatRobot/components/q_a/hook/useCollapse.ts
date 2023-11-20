import { computed, provide, ref } from "vue"
import { chatCollapseKey } from "@/key/index"

const useCollapse = (isOnly: boolean = true) => {
    // 折叠数组
    const collapseArr = ref<string[]>([])

    // 添加折叠
    const addCollapse = (collapseName: string) => {
        // 如果是手风琴模式
        if (isOnly) {
            collapseArr.value = [collapseName]
            return
        }
        collapseArr.value.push(collapseName)
    }
    // 移出折叠项
    const removeCollapse = (collapseName: string) => {
        const index = collapseArr.value.findIndex((item) => item === collapseName)
        collapseArr.value.splice(index, 1)
    }

    // 注入进子组件
    // provide(chatCollapseKey, {

    // })

    return {
        collapseArr,
        addCollapse,
        removeCollapse,
    }
}

export { useCollapse }
