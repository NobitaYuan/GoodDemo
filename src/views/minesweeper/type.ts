// 每一个格子的状态
interface BlockState {
    x: number // x坐标
    y: number // y坐标
    revealed: boolean // 是否被翻开
    mine: boolean // 是否是雷
    flagged: boolean // 是否被标记
    adjacentMines: number // 周围雷的数量
}
// 游戏状态
type GameState = "init" | "playing" | "gameOver" | "pause"

// class状态
interface classState {
    // 格子的宽高
    WIDTH: number
    HEIGHT: number
    // 每个格子生成雷的概率
    mineProbability: number
    // 格子的状态数据
    state: BlockState[][]
    // 本次生成雷的数量
    mineCount: number
    // 游戏是否胜利
    isWin: boolean | null
    // 游戏状态 "init" | "playing" | "gameOver"
    gameState: GameState
    // 时间
    gameTime: number
    // 计时器
    timer: null | number
    // 是否本地存储
    isLocal: boolean
}

export type { BlockState, GameState, classState }
