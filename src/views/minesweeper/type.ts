interface BlockState {
    x: number // x坐标
    y: number // y坐标
    revealed: boolean // 是否被翻开
    mine: boolean // 是否是雷
    flagged: boolean // 是否被标记
    adjacentMines: number // 周围雷的数量
}

export type { BlockState }
