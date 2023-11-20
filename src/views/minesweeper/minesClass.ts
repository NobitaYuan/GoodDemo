// vue
import { reactive, onBeforeUnmount, onDeactivated } from "vue"
// type
import type { BlockState, classState } from "./type"
// vueuse
import { useStorage } from "@vueuse/core"
// key
import { MinesweeperKey } from "@/key/index"
class Minesweeper {
    classState = reactive<classState>({
        // 格子的宽高
        WIDTH: 10,
        HEIGHT: 10,
        // 每个格子生成雷的概率
        mineProbability: 0.2,
        // 格子的状态数据
        state: [[]],
        // 本次生成雷的数量
        mineCount: 0,
        // 游戏是否胜利
        isWin: null,
        // 游戏状态 "init" | "playing" | "gameOver" | "pause"
        gameState: "init",
        // 时间
        gameTime: 0,
        // 计时器
        timer: null,
        // 是否本地存储
        isLocal: false,
    })
    /**
     * @description 描述
     * @param {number} w 列数 (10)
     * @param {number} h 行数 (10)
     * @param {number} rate 每一格生成雷的概率 (0.2)
     * @param {boolean} isLocal 是否数据持久化 (false)
     * @return {Minesweeper} 返回class实例
     */
    constructor(w: number = 10, h: number = 10, rate: number = 0.2, isLocal: boolean = false) {
        this.classState.WIDTH = w
        this.classState.HEIGHT = h
        this.classState.mineProbability = rate
        this.classState.isLocal = isLocal
        // 在组件卸载时或失活时，暂停游戏
        onBeforeUnmount(() => {
            if (this.classState.gameState === "playing") {
                console.log("组件卸载暂停")
                this.pause()
            }
        })
        onDeactivated(() => {
            if (this.classState.gameState === "playing") {
                console.log("组件失活暂停")
                this.pause()
            }
        })

        if (this.classState.isLocal) {
            this.saveToLocal()
        }
        if (this.classState.gameState === "playing") {
            this.pause()
        }
        if (!(this.classState.gameState === "playing" || this.classState.gameState === "pause")) {
            this.init()
        }
    }
    // 生成基本数据
    generateData = () => {
        this.classState.state = Array.from({ length: this.classState.HEIGHT }, (_, y) =>
            Array.from({ length: this.classState.WIDTH }, (_, x): BlockState => ({ x, y, revealed: false, mine: false, flagged: false, adjacentMines: 0 })),
        )
    }
    // 生成雷
    generateMines = (initBlock: BlockState) => {
        for (const row of this.classState.state) {
            for (const block of row) {
                // 初始点击的方块的四周不生成雷
                // if (Math.abs(block.x - initBlock.x) <= 1 && Math.abs(block.y - initBlock.y) <= 1) continue
                // 点击的方块不生成雷
                if (block.x === initBlock.x && block.y === initBlock.y) continue
                // 生成雷
                if (Math.random() <= this.classState.mineProbability) {
                    block.mine = true
                    this.classState.mineCount++
                }
            }
        }
        if (this.classState.mineCount === 0) {
            this.generateMines(initBlock)
        }
    }
    // 遍历获取周围雷的数量
    updateNumbers = () => {
        for (const row of this.classState.state) {
            for (const block of row) {
                if (block.mine) continue
                block.adjacentMines = this.getAdjacentMines(block)
            }
        }
    }
    // 获取周围雷的数量Fn
    getAdjacentMines = (block: BlockState) => {
        let mines = 0
        this.getSiblings(block).forEach((sibling) => {
            if (sibling.mine) mines++
        })
        return mines
    }
    // 获得周围的格子
    getSiblings = (block: BlockState) => {
        const siblings: BlockState[] = []
        for (const [dx, dy] of direction) {
            const x = block.x + dx
            const y = block.y + dy
            if (x < 0 || x >= this.classState.WIDTH || y < 0 || y >= this.classState.HEIGHT) continue
            siblings.push(this.classState.state[y][x])
        }
        return siblings
    }
    /* ___________________________ 事件 ____________________________ */
    // 将所有的block都翻开
    revealAll = () => {
        for (const row of this.classState.state) {
            for (const block of row) {
                block.revealed = true
            }
        }
    }
    // 左键翻面
    revealFn = (block: BlockState) => {
        if (this.classState.gameState === "gameOver") return
        if (block.revealed) return
        // 点击第一下后才开始生成雷
        if (this.classState.gameState === "init") {
            // 游戏开始
            this.start(block)
        }
        // 翻面
        block.revealed = true
        // 如果为暂停状态，点击后，继续游戏
        if (this.classState.gameState === "pause") {
            this.continue()
        }
        // 踩雷
        if (block.mine) {
            // 游戏结束
            this.end(false)
            return
        }
        this.revealSiblings(block)
        this.checkGameStatus()
    }
    // 右键标记
    flagFn = (block: BlockState) => {
        if (this.classState.gameState === "gameOver") return
        if (block.revealed) return
        // 点击第一下后才开始生成雷
        if (this.classState.gameState === "init") {
            // 游戏开始
            this.start(block)
        }
        // 标记
        block.flagged = !block.flagged
        // 如果为暂停状态，点击后，继续游戏
        if (this.classState.gameState === "pause") {
            this.continue()
        }
    }
    // 将格子周围的格子都翻开
    revealSiblings = (block: BlockState) => {
        const siblings = this.getSiblingsWithoutMine(block)
        for (const sibling of siblings) {
            if (sibling.revealed) continue
            if (sibling.mine) continue
            sibling.revealed = true
            if (sibling.adjacentMines === 0) {
                this.revealSiblings(sibling)
            }
        }
    }
    // 获得周围的格子(判断雷)
    getSiblingsWithoutMine = (block: BlockState) => {
        const siblings: BlockState[] = []
        for (const [dx, dy] of direction) {
            const x = block.x + dx
            const y = block.y + dy
            if (x < 0 || x >= this.classState.WIDTH || y < 0 || y >= this.classState.HEIGHT) continue
            // 左上
            if (dx === -1 && dy === -1) {
                if (this.getDirectionBlock(this.classState.state[y][x], 1, 0)?.mine || this.getDirectionBlock(this.classState.state[y][x], 0, -1)?.mine) continue
            }
            // 右上
            if (dx === 1 && dy === -1) {
                if (this.getDirectionBlock(this.classState.state[y][x], -1, 0)?.mine || this.getDirectionBlock(this.classState.state[y][x], 0, 1)?.mine) continue
            }
            // 左下
            if (dx === -1 && dy === 1) {
                if (this.getDirectionBlock(this.classState.state[y][x], 0, -1)?.mine || this.getDirectionBlock(this.classState.state[y][x], 1, 0)?.mine) continue
            }
            // 右下
            if (dx === 1 && dy === 1) {
                if (this.getDirectionBlock(this.classState.state[y][x], 0, -1)?.mine || this.getDirectionBlock(this.classState.state[y][x], -1, 0)?.mine) continue
            }
            siblings.push(this.classState.state[y][x])
        }
        return siblings
    }
    // 获得某个方向的格d
    getDirectionBlock = (block: BlockState, dx: number, dy: number): BlockState | null => {
        const x = block.x + dx
        const y = block.y + dy
        if (x < 0 || x >= this.classState.WIDTH || y < 0 || y >= this.classState.HEIGHT) {
            return null
        }
        return this.classState.state[y][x] || null
    }
    // 检查是否胜利
    checkGameStatus = () => {
        const arr = this.classState.state.flat().filter((block) => !block.mine)
        // 非雷的是否都翻开
        const isWon = arr.every((block) => block.revealed)
        if (isWon) {
            this.end(isWon)
        }
    }
    // 初始化游戏
    init = () => {
        this.classState.gameState = "init"
        this.classState.mineCount = 0
        this.classState.gameTime = 0
        this.stopTimer()
        this.generateData()
        console.log("init", this.classState)
    }
    // 开始游戏
    start = (block: BlockState) => {
        this.classState.gameState = "playing"
        this.generateMines(block)
        this.updateNumbers()
        this.countTime()
    }
    // 结束游戏
    end = (isWin: boolean) => {
        this.classState.gameState = "gameOver"
        this.classState.isWin = isWin
        this.stopTimer()
        if (isWin) {
            alert("You Win!")
        } else {
            alert("Game Over~")
        }
        this.revealAll()
    }
    // 暂停游戏
    pause = () => {
        this.classState.gameState = "pause"
        this.stopTimer()
    }
    // 继续游戏
    continue = () => {
        this.classState.gameState = "playing"
        this.countTime()
    }
    //结束计时
    stopTimer = () => {
        clearInterval(this.classState.timer as number)
        this.classState.timer = null
    }
    // 计时
    countTime = () => {
        this.stopTimer()
        this.classState.timer = setInterval(() => {
            this.classState.gameTime++
        }, 1000) as any
    }

    // 存储至本地，并且是响应式的
    saveToLocal = () => {
        const localData = useStorage(MinesweeperKey, this.classState)
        this.classState = localData.value
    }

    // 设置
    setting = (option: { w: number; h: number; rate: number }) => {
        this.classState.WIDTH = option.w
        this.classState.HEIGHT = option.h
        this.classState.mineProbability = option.rate
        this.init()
    }
}

// 方向
const direction = [
    [-1, -1], // 左上
    [0, -1], // 上
    [1, -1], // 右上
    [-1, 0], // 左
    [1, 0], // 右
    [-1, 1], // 左下
    [0, 1], // 下
    [1, 1], // 右下
]

export { Minesweeper }
