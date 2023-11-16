<script lang="ts" setup>
import { onMounted, ref } from 'vue';

// 是否开发模式
const isDev = false
// 格子的宽高
const WIDTH = 10
const HEIGHT = 10
// 每个格子生成雷的概率
const mineProbability = 0.2
// 本次生成雷的数量
let mineCount = 0
// 是否开始游戏
let isStart = false
// 游戏是否结束
let isGameOver = false


interface BlockState {
    x: number // x坐标
    y: number // y坐标 
    revealed: boolean// 是否被翻开
    mine?: boolean // 是否是雷
    flagged: boolean // 是否被标记
    adjacentMines: number // 周围雷的数量
}
const state = ref<BlockState[][]>([[]])

// 生成基本数据
const generateData = () => {
    state.value = []
    state.value = Array.from({ length: HEIGHT }, (_, y) =>
        Array.from({ length: WIDTH },
            (_, x): BlockState => ({ x, y, revealed: false, flagged: false, adjacentMines: 0 })
        ))
}

// 生成雷
const generateMines = (initBlock: BlockState) => {
    for (const row of state.value) {
        for (const block of row) {
            // 初始点击的方块的四周不生成雷
            // if (Math.abs(block.x - initBlock.x) <= 1 && Math.abs(block.y - initBlock.y) <= 1) continue
            // 点击的方块不生成雷
            if (block.x === initBlock.x && block.y === initBlock.y) continue
            // 生成雷
            if (Math.random() <= mineProbability) {
                block.mine = true
                mineCount++
            }
        }
    }
}

// 遍历获取周围雷的数量
const updateNumbers = () => {
    for (const row of state.value) {
        for (const block of row) {
            if (block.mine) continue
            block.adjacentMines = getAdjacentMines(block)
        }
    }
}
// 方向
const direction = [
    [-1, -1], // 左上
    [0, -1],  // 上
    [1, -1],  // 右上
    [-1, 0],  // 左
    [1, 0],   // 右
    [-1, 1],  // 左下
    [0, 1],   // 下
    [1, 1],   // 右下
]
// 获取周围雷的数量Fn
const getAdjacentMines = (block: BlockState) => {
    let mines = 0
    getSiblings(block).forEach((sibling) => {
        if (sibling.mine) mines++
    })
    return mines
}
// 获得周围的格子
const getSiblings = (block: BlockState) => {
    const siblings: BlockState[] = []
    for (const [dx, dy] of direction) {
        const x = block.x + dx
        const y = block.y + dy
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) continue
        siblings.push(state.value[y][x])
    }
    return siblings
}

/* ___________________________ 事件 ____________________________ */
// 将所有的block都翻开
const revealAll = () => {
    for (const row of state.value) {
        for (const block of row) {
            block.revealed = true
        }
    }
}
// 翻面
const reveal = (block: BlockState) => {
    if (isGameOver) return

    // 点击第一下后才开始生成雷
    if (!isStart) {
        isStart = true
        generateMines(block)
        updateNumbers()
    }

    if (block.flagged) return

    // 翻面
    block.revealed = true

    // 踩雷
    if (block.mine) {
        revealAll()
        isGameOver = true
        alert('Game Over')
        return
    }
    
    revealSiblings(block)
}
// 标记
const flagFn = (block: BlockState) => {
    block.flagged = true
}

// 开始
const init = () => {
    isStart = false
    isGameOver = false
    mineCount = 0
    generateData()
}

// 将格子周围的格子都翻开
const revealSiblings = (block: BlockState) => {
    const siblings = getSiblings(block)
    for (const sibling of siblings) {
        if (sibling.revealed) continue
        if (sibling.mine) continue
        sibling.revealed = true
        if (sibling.adjacentMines === 0) {
            revealSiblings(sibling)
        }
    }
}

onMounted(() => {
    init()
})
</script>

<template>
    <div class="minesweeper-container flex flex-col items-center gap-3">
        <div class="header text-3xl font-bold">
            <div class="header__title text-center mb-3">扫雷</div>
            <div class="header__buttons">
                <el-button @click="init" :type="'success'" class="header__button">Restart</el-button>
                <el-button class="header__button">Settings</el-button>
            </div>
        </div>
        <div class="content flex-1  flex items-center">
            <!-- {{ state }} -->
            <div class="content_field">
                <div class="row" v-for="(row, index) in state" :key="index">
                    <div class="col" v-for="(block, idx) in row" :key="idx" @click="reveal(block)"
                        @contextmenu.prevent="flagFn(block)">
                        <!-- 未翻面 -->
                        <template v-if="!block.revealed && !isDev">
                            <div class="mask"> </div>
                        </template>
                        <!-- 翻面 -->
                        <template v-else>
                            <div class="self">{{ block.mine ? '💣' : block.adjacentMines }}</div>
                        </template>
                        <!-- 标记 -->
                        <div class="flag" v-if="!block.revealed && block.flagged">
                            {{ '🚩' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="timer">00:00</div>
            <div class="mines">10</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.minesweeper-container {
    height: 100%;


    .header {}

    .content {
        .content_field {
            .row {
                display: flex;

                .col {
                    width: 40px;
                    height: 40px;
                    border: 1px solid;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                    user-select: none;

                    &:hover {
                        background-color: var(--el-color-info-light-7);
                    }

                    .mask {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: var(--el-color-info-light-5);

                        &:hover {
                            background-color: var(--el-color-info-light-7);
                        }
                    }

                    .flag {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }

    .footer {}
}
</style>