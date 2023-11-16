import type { RouteRecordRaw } from "vue-router"

export const errRouter: Array<RouteRecordRaw> = [
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/error/404View.vue"),
        meta: {
            title: "页面未找着",
        },
    },
]
