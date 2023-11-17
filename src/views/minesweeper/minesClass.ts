import { ref, computed, onMounted } from "vue"
import type { BlockState } from "./type"
class Minesweeper {
    // 格子的宽高
    WIDTH = 10
    HEIGHT = 10
    // 每个格子生成雷的概率
    mineProbability = 0.2
    // 格子的状态数据
    state = ref<BlockState[][]>([[]])
    // 本次生成雷的数量
    mineCount = 0
    // 是否开始游戏
    isStart = false
    // 游戏是否结束
    isGameOver = false
    // 游戏是否胜利
    isWin = ref<boolean | null>(null)
    // 时间
    initTime = new Date("2023-11-17 15:33:23")
    startTime = ref<Date>(this.initTime)
    endTime = ref<Date>(this.initTime)
    // 获得总共的秒数差
    timeGap = computed(() => {
        const gap = (this.endTime.value.getTime() - this.startTime.value.getTime()) / 1000
        return Math.trunc(Math.abs(gap))
    })
    // 计时器
    timer: any = null

    constructor(w?: number, h?: number, rate?: number) {
        this.WIDTH = w || this.WIDTH
        this.HEIGHT = h || this.HEIGHT
        this.mineProbability = rate || this.mineProbability
        this.init()
        onMounted(() => {
            clearInterval(this.timer)
            this.timer = null
        })
    }
    // 生成基本数据
    generateData = () => {
        this.state.value = []
        this.state.value = Array.from({ length: this.HEIGHT }, (_, y) =>
            Array.from({ length: this.WIDTH }, (_, x): BlockState => ({ x, y, revealed: false, mine: false, flagged: false, adjacentMines: 0 })),
        )
    }
    // 生成雷
    generateMines = (initBlock: BlockState) => {
        for (const row of this.state.value) {
            for (const block of row) {
                // 初始点击的方块的四周不生成雷
                // if (Math.abs(block.x - initBlock.x) <= 1 && Math.abs(block.y - initBlock.y) <= 1) continue
                // 点击的方块不生成雷
                if (block.x === initBlock.x && block.y === initBlock.y) continue
                // 生成雷
                if (Math.random() <= this.mineProbability) {
                    block.mine = true
                    this.mineCount++
                }
            }
        }
        if (this.mineCount === 0) {
            this.generateMines(initBlock)
        }
    }
    // 遍历获取周围雷的数量
    updateNumbers = () => {
        for (const row of this.state.value) {
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
            if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) continue
            siblings.push(this.state.value[y][x])
        }
        return siblings
    }
    /* ___________________________ 事件 ____________________________ */
    // 将所有的block都翻开
    revealAll = () => {
        for (const row of this.state.value) {
            for (const block of row) {
                block.revealed = true
            }
        }
    }
    // 左键翻面
    revealFn = (block: BlockState) => {
        if (this.isGameOver) return

        // 点击第一下后才开始生成雷
        if (!this.isStart) {
            // 游戏开始
            this.start(block)
        }

        if (block.revealed) return

        // 翻面
        block.revealed = true

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
        // 点击第一下后才开始生成雷
        if (!this.isStart) {
            this.isStart = true
            this.generateMines(block)
            this.updateNumbers()
        }
        if (this.isGameOver) return
        if (block.revealed) return
        block.flagged = !block.flagged
        // this.checkGameStatus()
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
            if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) continue
            // 左上
            if (dx === -1 && dy === -1) {
                if (this.getDirectionBlock(this.state.value[y][x], 1, 0)?.mine || this.getDirectionBlock(this.state.value[y][x], 0, -1)?.mine) continue
            }
            // 右上
            if (dx === 1 && dy === -1) {
                if (this.getDirectionBlock(this.state.value[y][x], -1, 0)?.mine || this.getDirectionBlock(this.state.value[y][x], 0, 1)?.mine) continue
            }
            // 左下
            if (dx === -1 && dy === 1) {
                if (this.getDirectionBlock(this.state.value[y][x], 0, -1)?.mine || this.getDirectionBlock(this.state.value[y][x], 1, 0)?.mine) continue
            }
            // 右下
            if (dx === 1 && dy === 1) {
                if (this.getDirectionBlock(this.state.value[y][x], 0, -1)?.mine || this.getDirectionBlock(this.state.value[y][x], -1, 0)?.mine) continue
            }
            siblings.push(this.state.value[y][x])
        }
        return siblings
    }
    // 获得某个方向的格d
    getDirectionBlock = (block: BlockState, dx: number, dy: number): BlockState | null => {
        const x = block.x + dx
        const y = block.y + dy
        if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) {
            return null
        }
        return this.state.value[y][x] || null
    }

    // 检查是否胜利
    checkGameStatus = () => {
        const arr = this.state.value.flat().filter((block) => !block.mine)
        // 非雷的是否都翻开
        const isWin = arr.every((block) => block.revealed)

        // 如果非雷的全部翻开，并且雷的是否都标记
        // const isWin2 = this.state.value
        //     .flat()
        //     .filter((block) => block.mine)
        //     .every((block) => block.flagged)

        // if (isWin || isWin2) {
        if (isWin) {
            this.end(isWin)
        }
    }

    // 初始化
    init = () => {
        this.isStart = false
        this.isGameOver = false
        this.mineCount = 0
        this.startTime.value = this.initTime
        this.endTime.value = this.initTime
        clearInterval(this.timer)
        this.timer = null
        this.generateData()
    }

    // 开始
    start = (block: BlockState) => {
        this.isStart = true
        const d = new Date()
        this.startTime.value = d
        this.endTime.value = d
        this.generateMines(block)
        this.updateNumbers()
        this.timer = setInterval(() => {
            this.endTime.value = new Date()
        }, 1000)
    }
    // 结束
    end = (isWin: boolean) => {
        this.isGameOver = true
        this.isWin.value = isWin
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
        if (isWin) {
            alert("You Win!")
        } else {
            alert("Game Over~")
        }
        this.revealAll()
    }

    // 设置
    setting = (option: { w: number; h: number; rate: number }) => {
        this.WIDTH = option.w
        this.HEIGHT = option.h
        this.mineProbability = option.rate
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
