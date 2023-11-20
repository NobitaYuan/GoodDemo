<script setup lang="ts">
const hieghtTransitionStyle = "max-height .3s ease"
const hooks = {
    css: false,
    // 在元素被插入到 DOM 之前被调用
    // 用这个来设置元素的 "enter-from" 状态
    onBeforeEnter(el: HTMLElement) {
        el.style.transition = hieghtTransitionStyle
        el.style.maxHeight = "0px"
    },

    // 在元素被插入到 DOM 之后的下一帧被调用
    // 用这个来开始进入动画
    onEnter(el: HTMLElement) {
        el.style.maxHeight = el.scrollHeight + "px"
        el.style.overflow = "hidden"
    },

    // 当进入过渡完成时调用。
    onAfterEnter(el: HTMLElement) {
        el.style.maxHeight = ""
        el.style.overflow = ""
    },
    // 在 leave 钩子之前调用
    // 大多数时候，你应该只会用到 leave 钩子
    onBeforeLeave(el: HTMLElement) {
        el.style.maxHeight = el.scrollHeight + "px"
        el.style.overflow = "hidden"
    },

    // 在离开过渡开始时调用
    // 用这个来开始离开动画
    onLeave(el: HTMLElement) {
        // 调用回调函数 done 表示过渡结束
        // 如果与 CSS 结合使用，则这个回调是可选参数
        if (el.scrollHeight !== 0) {
            el.style.maxHeight = "0px"
        }
    },

    // 在离开过渡完成、
    // 且元素已从 DOM 中移除时调用
    onAfterLeave(el: HTMLElement) {
        el.style.maxHeight = ""
        el.style.transition = ""
    },
}
</script>
<template>
    <transition
        @before-enter="hooks.onBeforeEnter"
        @enter="hooks.onEnter"
        @after-enter="hooks.onAfterEnter"
        @before-leave="hooks.onBeforeLeave"
        @leave="hooks.onLeave"
        @after-leave="hooks.onAfterLeave"
    >
        <slot></slot>
    </transition>
</template>
