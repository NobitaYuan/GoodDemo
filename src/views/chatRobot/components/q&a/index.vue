<script lang="ts" setup>
interface IProps {
    title: string
}
const Props = withDefaults(defineProps<IProps>(), {
    title: "您好，请选择您遇到的问题类型：",
})
</script>

<template>
    <div class="q&a-container">
        <div class="q&a-box bg-white text-[#000000D9]">
            <div class="head p-[16px]">
                <div class="title">{{ Props.title }}</div>
            </div>
            <div class="body"></div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
