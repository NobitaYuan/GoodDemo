<script lang="ts" setup>
import type { BlockState } from "../type"

interface IProps {
    block: BlockState
    isDev: boolean
}
withDefaults(defineProps<IProps>(), {})

const emit = defineEmits(["reveal", "flag"])

const reveal = (block: BlockState) => {
    emit("reveal", block)
}

const flagFn = (block: BlockState) => {
    emit("flag", block)
}
</script>

<template>
    <div class="block-container">
        <div class="block w-10 h-10 rounded-[3px] flex text-center items-center justify-center relative select-none" @click="reveal(block)" @contextmenu.prevent="flagFn(block)">
            <!-- 未翻面 -->
            <template v-if="!block.revealed">
                <div class="mask w-full h-full rounded-[3px] flex items-center justify-center">
                    <template v-if="isDev">
                        {{ block.mine ? "💣" : block.adjacentMines }}
                    </template>
                </div>
            </template>
            <!-- 翻面 -->
            <template v-else>
                <div class="self">{{ block.mine ? "💣" : block.adjacentMines }}</div>
            </template>
            <!-- 标记 -->
            <div class="flag absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center" v-if="!block.revealed && block.flagged">
                {{ "🚩" }}
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.block-container {
    .block {
        border: 0.2px solid var(--el-color-info-dark-2);

        // &:hover {
        //     background-color: var(--el-color-info-light-7);
        // }

        .mask {
            background-color: var(--el-color-info-light-5);
            cursor: pointer;
            &:hover {
                background-color: var(--el-color-info-light-7);
            }
        }

        .flag {
        }
    }
}
</style>
