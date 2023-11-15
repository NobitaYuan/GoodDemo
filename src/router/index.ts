import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("@/views/index/index.vue"),
            meta: {
                title: "index",
            },
        },
        {
            path: "/RxJs",
            name: "RxJs",
            component: () => import("@/views/RxJs/index.vue"),
            meta: {
                title: "RxJs",
            },
        },
        {
            path: "/randomTree",
            name: "randomTree",
            component: () => import("@/views/randomTree/index.vue"),
            meta: {
                title: "随意生长的梅花树",
            },
        },
        {
            path: "/clearBomb",
            name: "clearBomb",
            component: () => import("@/views/clearBomb/index.vue"),
            meta: {
                title: "扫雷",
            },
        }
    ],
})

export default router
