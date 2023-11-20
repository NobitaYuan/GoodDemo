import type { InjectionKey } from "vue"

/* ——————————本地存储—————————— */

// 扫雷的class信息
const MinesweeperKey = "Minesweeper-Data"
// 聊天机器人弹窗的定位和显隐信息
const chatDialogKey = "chatDialog-Data"

/* ——————————provide-inject—————————— */
// 聊天机器人里的折叠面板的key
const chatCollapseKey: InjectionKey<symbol> = Symbol("chatDialog-collapseKey")

export { MinesweeperKey, chatDialogKey, chatCollapseKey }
