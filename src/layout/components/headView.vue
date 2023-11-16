<script lang="ts" setup>
import { ref } from "vue"
import { useDark, useToggle } from "@vueuse/core"
import { Sunny, Moon } from "@element-plus/icons-vue"

const isDark = useDark()
const toggleDark = () => {
    isDark.value = value1.value
    useToggle(isDark)
}

const value1 = ref(false)
</script>

<template>
    <el-card body-style="padding:12px;height:100%" class="card">
        <div class="head">
            <div class="title">{{ $router.currentRoute.value.meta.title }}</div>
            <div class="right">
                <el-switch style="--el-switch-on-color: #2c2c2c" v-model="value1" @click="toggleDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" />
            </div>
        </div>
    </el-card>
</template>

<style lang="less" scoped>
.card {
    height: 100%;
}
.head {
    display: flex;
    position: relative;
    justify-content: center;
    .title {
        font-size: 20px;
    }
    .right {
        position: absolute;
        right: 10px;
        top: 0;
    }
}
</style>
