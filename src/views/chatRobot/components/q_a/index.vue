<script lang="ts" setup>
import qAItem from "./q_a-item.vue"
import { useCollapse } from "./hook/useCollapse"
import { onMounted } from "vue"
interface IProps {
    title?: string
    isOnly?: boolean
}
const Props = withDefaults(defineProps<IProps>(), {
    title: "您好，请选择您遇到的问题类型：",
    isOnly: true,
})

interface IQAndA {
    title: string
    question: string[]
}
const QAndA_arr: IQAndA[] = [
    {
        title: "热门问题",
        question: [
            "下载PDF简历为什么显示要开通会员",
            "可以下载word版本吗？",
            "如何下载简历？",
            "微信账号和手机号分别绑定两个账号怎么办？",
            "如何下载简历模板？",
            "误删模块能恢复信息吗？",
            "简历下载之后保存到了哪里？",
            "不太会总结自己的经历，能帮忙看一下吗？",
            "如何使用中译英 / 英译中功能？",
            "在线编辑的简历是自动保存的吗？",
            "为什么会生成空白的第二页？",
        ],
    },
    {
        title: "简历导入/导出相关问题",
        question: ["可以下载word版本吗？", "如何下载简历？", "简历下载之后保存到了哪里？", "如何使用中译英 / 英译中功能？", "下载PDF简历为什么显示要开通会员"],
    },
    {
        title: "简历编辑相关问题",
        question: ["电脑端网页版用户", "移动端App和小程序"],
    },
    {
        title: "超级简历账号相关问题",
        question: [
            "如何注销账号？",
            "微信账号和手机号分别绑定两个账号怎么办？",
            "如何登录/注册？",
            "如何解绑账号？",
            "怎样购买会员？",
            "邮箱/领英 账号如何登陆呢？",
            "如何更改账号绑定的手机号、微信号？",
            "优惠码的有效期是多久？",
            "会员有新模板吗？",
            "为什么登录设备数量达到上限无法登录？",
        ],
    },
    {
        title: "超级会员&导师辅导相关问题",
        question: ["超级会员的相关问题", "导师辅导的相关问题", "我需要退款"],
    },
    {
        title: "超级简历平台的其他功能",
        question: ["简历模版的使用问题", "简历推荐功能", "职位投递功能"],
    },
    {
        title: "超级简历最新上线功能介绍",
        question: ["手机App简历可以直接拍照导入", "手机App中的简历分享给好友可以点评", "简历推荐功能的作用", "简历纠错", "如何注销账号？", "同一公司的不同经历可以合并吗?"],
    },
    {
        title: "求职服务咨询",
        question: [],
    },
]

const { addCollapse } = useCollapse(Props.isOnly)

onMounted(() => {
    //  默认展开第一个
    addCollapse("qAitem0")
})
</script>

<template>
    <div class="q_a-container">
        <div class="q_a-box bg-white text-[#000000D9]">
            <div class="head p-[16px]">
                <div class="title">{{ Props.title }}</div>
            </div>
            <div class="body">
                <div class="item-box">
                    <template v-for="(item, index) in QAndA_arr" :key="index">
                        <qAItem :title="item.title" :question="item.question" :k="'qAitem' + index" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.q_a-container {
    .q_a-box {
        .head {
            .title {
            }
        }

        .body {
            .item-box {
                padding: 0 16px;
            }
        }
    }
}
</style>
