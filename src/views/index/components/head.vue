<script lang="ts" setup>
import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { Sunny, Moon } from "@element-plus/icons-vue";

const isDark = useDark();
const toggleDark = () => {
    isDark.value = value1.value;
    useToggle(isDark);
};

const value1 = ref(false);
</script>

<template>
    <el-card body-style="padding:12px">
        <div class="head">
            <div class="title flex-center" >Demo</div>
            <div class="right">
                <el-switch
                    style="--el-switch-on-color:#2c2c2c"
                    v-model="value1"
                    @click="toggleDark"
                    inline-prompt
                    :active-icon="Moon"
                    :inactive-icon="Sunny"
                />
            </div>
        </div>
    </el-card>
</template>

<style lang="less" scoped>
.head {
    display: flex;
    .title {
        width: 200px;
        justify-content: flex-start;
    }
    .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }
}
// .is-checked{
//     background: #2c2c2c !important;
//     border: 1px solid #4c4d4f !important;
// }
</style>
