<script lang="ts" setup>
import { Observable, fromEvent, throttleTime, debounceTime, scan, from, map, filter, concat, catchError, take } from "rxjs"
import { onMounted, ref } from "vue"

const isLoading = ref<boolean>(false)
const arr = ref<string[]>([])
const delFn = (item: string) => {
    const index = arr.value.indexOf(item)
    arr.value.splice(index, 1)
}

const url = "https://v1.hitokoto.cn/?lang=cn"

// https://v1.hitokoto.cn/?encode=json&c=d&c=j&c=k&c=k&c=i&lang=cn
const fetchFn = (err: boolean = true) => {
    return new Observable((subscribe) => {
        fetch(url)
            .then(async (res) => {
                if (err) {
                    subscribe.next(await res.json())
                } else {
                    subscribe.error(res.json())
                }
            })
            .catch((err) => {
                subscribe.error(err)
            })
            .finally(() => {
                subscribe.complete()
                // console.log("finally")
            })
    })
}

// const getAllSub = ()

const clickFn = () => {
    isLoading.value = true
    // 按顺序执行这三个请求，等待前一个请求完成后再执行下一个请求
    fetchFn()
    fetchFn(false)
    fetchFn()
}

new Observable((subscribe) => {
    subscribe.next(1)
    subscribe.next(2)
    subscribe.next(3)
    subscribe.complete()
})
    .pipe(
        map((item) => {
            return item * 2
        }),
    )
    .subscribe((res) => console.log(res))
</script>

<template>
    <div class="RxJs-container" v-loading="isLoading">
        <div class="ul">
            <div class="li" v-for="item in arr">
                <div class="text">
                    {{ item }}
                </div>
                <div class="del" @click="delFn(item)">删</div>
            </div>
        </div>
        <el-button @click="clickFn">获取名言警句</el-button>
    </div>
</template>

<style lang="less" scoped>
.RxJs-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    .ul {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 8px;

        .li {
            background-color: var(--el-color-warning-light-8);
            display: flex;
            gap: 16px;
            justify-content: space-between;
            border: solid 1px var(--el-menu-border-color);

            .text {
                padding: 8px;
                color: var(--el-text-color-primary);
            }

            .del {
                cursor: pointer;
                background-color: var(--el-card-bg-color);
                user-select: none;
                padding: 8px;
                color: var(--el-color-danger-light-3);

                &:hover {
                    color: red;
                    background-color: #fff;
                }
            }
        }
    }
}
</style>
