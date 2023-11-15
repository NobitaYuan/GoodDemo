import { createApp } from "vue"
import App from "./App.vue"

import "./style/main.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"

//
import router from "@/router/index.ts"

createApp(App).use(router).mount("#app")
