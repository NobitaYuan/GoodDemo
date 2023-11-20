<script lang="ts" setup>
import hTransition from "@/components/h-transition.vue"
import { ArrowRight } from "@element-plus/icons-vue"
import { computed, inject } from "vue"
import { chatCollapseKey } from "@/key/index"
import type { returnType } from "./hook/type"
interface IProps {
    title: string
    question: string[]
    k: string
}
const Props = withDefaults(defineProps<IProps>(), {
    title: "",
    k: "",
})

const { addCollapse, isActive } = inject<returnType>(chatCollapseKey)!

const active = computed(() => isActive(Props.k))

const clickFn = () => {
    addCollapse(Props.k)
}
</script>

<template>
    <div class="q_a-item-container">
        <div class="hd" @click="clickFn">
            <div class="dot"></div>
            <div class="title">{{ Props.title }}</div>
            <div class="icon" :class="{ isActive: active }">
                <el-icon color="#dedede">
                    <ArrowRight />
                </el-icon>
            </div>
        </div>
        <div class="bd">
            <hTransition>
                <div v-show="active" class="question">
                    <div class="question-item" v-for="(item, index) in Props.question" :key="index">
                        <div class="question-item-index">{{ index + 1 }}.</div>
                        <div class="question-item-text" :title="item">{{ item }}</div>
                        <div class="question-item-icon">
                            <el-icon color="#dedede" :size="16">
                                <ArrowRight />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </hTransition>
        </div>
    </div>
</template>

<style lang="less" scoped>
.q_a-item-container {
    &:last-child {
        .hd {
            border-bottom: none;
        }
    }

    .hd {
        display: flex;
        align-items: center;
        padding: 12px 0;
        gap: 8px;
        color: #000000d9;
        cursor: pointer;
        font-size: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        &:hover {
            color: #2c7cf6;

            .dot {
                background-color: #2c7cf6;
            }
        }

        .dot {
            width: 6px;
            height: 6px;
            background-color: rgba(0, 0, 0, 0.25);
            border-radius: 50%;
        }

        .title {
            margin-right: auto;
        }

        .icon {
            transform: rotate(0deg);
            transition: 0.1s all linear;

            &.isActive {
                transform: rotate(90deg);
            }
        }
    }

    .bd {
        .question {
            padding-left: 16px;

            .question-item {
                display: flex;
                align-items: flex-start;
                color: #000000a6;
                font-size: 14px;
                padding: 12px 0;
                cursor: pointer;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    color: #2c7cf6;
                }

                .question-item-index {
                    margin-top: 3px;
                }

                .question-item-text {
                    margin: 0 8px;
                    margin-right: auto;
                    line-height: 1.35;
                }

                .question-item-icon {
                    margin-top: 1.5px;
                    height: 16px;
                }
            }
        }
    }
}
</style>
