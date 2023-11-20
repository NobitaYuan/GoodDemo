import type { Ref } from "vue"

interface returnType {
    collapseArr: Ref<string[]>
    addCollapse: (collapseName: string) => void
    removeCollapse: (collapseName: string) => void
    isActive: (name: string) => boolean
}
export type { returnType }
