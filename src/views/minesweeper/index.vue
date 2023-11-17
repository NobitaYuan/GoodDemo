<script lang="ts" setup>
import { onMounted, ref } from "vue"
import blockBox from "./components/MineBlock.vue"
import { Minesweeper } from "./minesClass"
import { VideoPlay, Refresh, Setting, Check } from "@element-plus/icons-vue"
// 配置项
import { isDev } from "./setting"

const minesweeper = new Minesweeper()

const state = minesweeper.state

// 初始设置
const settings = ref({
    w: 10,
    h: 10,
    rate: 0.2,
})

const saveFn = () => {
    minesweeper.setting(settings.value)
}
const reSet = () => {
    settings.value = {
        w: 10,
        h: 10,
        rate: 0.2,
    }
}

onMounted(() => {
    saveFn()
})
</script>

<template>
    <div class="minesweeper-container flex justify-center flex-shrink-0 gap-10 p-8">
        <div class="left flex">
            <div class="content_field flex flex-col gap-[12.5px]">
                <div class="head">
                    <div class="tips text-center select-none flex justify-between">
                        <el-tag size="large">点击一个方块直接开始游戏</el-tag>
                        <el-tag size="large" type="success">{{ minesweeper.timeGap }}s</el-tag>
                    </div>
                </div>
                <div class="body flex flex-col gap-[2px]">
                    <div class="row flex gap-[2px]" v-for="(row, index) in state" :key="index">
                        <template v-for="block in row" :key="block">
                            <blockBox :block="block" :is-dev="isDev" @flag="minesweeper.flagFn" @reveal="minesweeper.revealFn" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="right min-w-[360px]">
            <div class="header__buttons flex flex-col gap-3 h-full">
                <div class="start-box flex justify-between">
                    <div class="btn">
                        <el-button @click="minesweeper.init" :icon="VideoPlay" :type="'success'">开 始</el-button>
                    </div>
                    <div class="btn select-none flex gap-2 items-center">
                        <div class="label text-sm" :style="{ color: 'var(--el-color-primary-light-3)' }">作弊模式</div>
                        <el-switch inline-prompt :active-icon="Check" v-model="isDev" active-color="var(--el-color-primary)" inactive-color="var(--el-color-info-dark-2)" />
                    </div>
                </div>
                <div class="settings">
                    <el-card>
                        <div class="slide-container flex flex-col gap-4">
                            <div class="slide">
                                <div class="label">列数</div>
                                <el-slider class="elSlider" show-input :size="'small'" v-model="settings.w" :min="5" :max="100" />
                            </div>
                            <div class="slide">
                                <div class="label">行数</div>
                                <el-slider class="elSlider" show-input :size="'small'" v-model="settings.h" :min="5" :max="100" />
                            </div>
                            <div class="slide">
                                <div class="label">每一格生成雷的概率</div>
                                <el-slider class="elSlider" :step="0.1" show-input :size="'small'" v-model="settings.rate" :min="0.1" :max="0.9" />
                            </div>
                            <div class="btn-container flex gap3 w-full">
                                <el-button :icon="Setting" class="flex-1" :type="'primary'" @click="saveFn">保存 & 开始</el-button>
                                <el-button :icon="Refresh" @click="reSet">重置</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<style lang="less" scoped>
.minesweeper-container {
    .left {
        .content_field {
            justify-content: flex-start;

            .row {
            }
        }
    }

    .right {
        .header__buttons {
            .btn {
            }

            .settings {
                .slide-container {
                    .slide {
                        .label {
                            font-size: 12px;
                            color: var(--el-color-info-dark-2);
                        }

                        .elSlider {
                            padding-left: 5px;
                        }
                    }
                }
            }
        }
    }

    .footer {
    }
}

@media screen and (max-width: 1000px) {
    .minesweeper-container {
        flex-direction: column;
        align-items: center;
    }
}
</style>
