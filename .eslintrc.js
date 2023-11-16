module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["@vue/eslint-config-typescript", "plugin:vue/vue3-essential"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["vue"],
    /* 
    "off"   或者 0  //关闭规则
    "warn"  或者 1  //把规则作为警告（不影响退出代码）
    "error" 或者 2  //把规则作为错误（退出代码触发时为1）
    */
    rules: {
        "@typescript-eslint/no-explicit-any": "off", // 允许使用any
        "@typescript-eslint/no-unused-vars": 2, //变量声明了但未使用
        // "semi": [1, "always"], // 分号
        // "indent": [1, 4], //缩进风格
        // quotes: [1, 'single'], // 引号类型 "double" 'single' `backtick`
        "semi-spacing": [1, { before: false, after: true }], //分号前后空格
        "use-isnan": 2, //禁止比较时使用NaN，只能用isNaN()
        "valid-jsdoc": 1, //jsdoc规则
        "max-depth": [0, 4], //嵌套块深度
        "@typescript-eslint/ban-ts-comment": "off", // 添加下面这行规则来允许使用 // @ts-ignore
        "vue/multi-word-component-names": [2, { ignores: ["index", "continue"] }], //组件名字使用两个单词，忽略index
        "vue/no-setup-props-destructure": 0, // 允许使用props解构
        "@typescript-eslint/no-this-alias": 0, // 更改this别名
        "no-extra-semi": 0, // 不必要的分号
    },
}
