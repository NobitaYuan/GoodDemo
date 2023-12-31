<script lang="ts" setup>
import { ref, computed, onMounted } from "vue"
import { Refresh } from "@element-plus/icons-vue"

const el = ref<HTMLCanvasElement | null>(null)

const ctx = computed(() => {
    return el.value?.getContext("2d")!
})

const dpr = window.devicePixelRatio

const cvsSize = {
    width: 1000,
    height: 800,
}

// 保证canvas的清晰度
// 原始尺寸 = 样式尺寸 * dpr(设备缩放比)
const init = () => {
    // 重置canvas的内容
    ctx.value.clearRect(0, 0, cvsSize.width * dpr, cvsSize.height * dpr)
    taskArr.length = 0

    // 设置canvas的宽高
    el.value!.width = cvsSize.width * dpr
    el.value!.height = cvsSize.height * dpr
    // 画线的颜色
    ctx.value.strokeStyle = "#9fa4ae"

    const startBranch = {
        start: {
            x: cvsSize.width / 2,
            y: cvsSize.height,
        },
        length: 30,
        angle: -Math.PI / 2,
    }

    drawTree(startBranch)
    playFrame()
}
// point
interface Point {
    x: number
    y: number
}
const lineTO = (start: Point, end: Point) => {
    ctx.value.beginPath()
    ctx.value.moveTo(start.x * dpr, start.y * dpr)
    ctx.value.lineTo(end.x * dpr, end.y * dpr)
    ctx.value.stroke()
}
// branch
interface Branch {
    start: Point
    length: number
    // 角度
    angle: number
}
const getEndPoint = (line: Branch) => {
    const { start, length, angle } = line
    return {
        x: start.x + length * Math.cos(angle),
        y: start.y + length * Math.sin(angle),
    }
}
// 画一个分支
const drawBranch = (b: Branch) => {
    lineTO(b.start, getEndPoint(b))
}

// drawTree,递归出来一棵树
const drawTree = (startBranch: Branch, depth = 0) => {
    const endPoint = getEndPoint(startBranch)
    drawBranch(startBranch)
    if (depth < 5 || Math.random() < 0.5) {
        taskArr.push(() =>
            drawTree(
                {
                    start: endPoint,
                    length: startBranch.length + (Math.random() * 10 - 5),
                    angle: startBranch.angle - 0.3 * Math.random(),
                },
                depth + 1,
            ),
        )
    }
    if (depth < 5 || Math.random() < 0.5) {
        taskArr.push(() =>
            drawTree(
                {
                    start: endPoint,
                    length: startBranch.length + (Math.random() * 10 - 5),
                    angle: startBranch.angle + 0.3 * Math.random(),
                },
                depth + 1,
            ),
        )
    }
}
// 画线的队列
const taskArr: Function[] = []
// 帧
const frame = () => {
    const task = [...taskArr]
    taskArr.length = 0
    task.forEach((fn) => fn())
}
let framesCount = 0
// 播放
const playFrame = () => {
    requestAnimationFrame(() => {
        framesCount += 1
        if (framesCount % 10 === 0) {
            frame()
        }
        playFrame()
    })
}

onMounted(() => {
    init()
})
</script>

<template>
    <div class="random-tree-container h-full flex flex-col items-center gap-2 text-#9fa4ae">
        <el-button @click="init" :icon="Refresh" :type="'success'" plain>Generate Again</el-button>
        <canvas class="cvs" ref="el"></canvas>
    </div>
</template>

<style lang="less" scoped>
.random-tree-container {
    .cvs {
        width: v-bind("cvsSize.width + 'px'");
        height: v-bind("cvsSize.height + 'px'");
        border: solid 1px var(--el-menu-border-color);
    }
}
</style>
