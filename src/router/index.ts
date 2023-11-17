import { createRouter, createWebHashHistory } from "vue-router"
import { errRouter } from "@/router/errRouter"
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("@/views/index/index.vue"),
            meta: {
                title: "Nobita",
            },
        },
        // {
        //     path: "/RxJs",
        //     name: "RxJs",
        //     component: () => import("@/views/RxJs/index.vue"),
        //     meta: {
        //         title: "RxJs",
        //     },
        // },
        {
            path: "/randomTree",
            name: "randomTree",
            component: () => import("@/views/randomTree/index.vue"),
            meta: {
                title: "随意生长的梅花树",
            },
        },
        {
            path: "/minesweeper",
            name: "minesweeper",
            component: () => import("@/views/minesweeper/index.vue"),
            meta: {
                title: "扫雷",
            },
        },
        ...errRouter,
    ],
})

export default router
