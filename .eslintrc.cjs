require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier"
  ],
  plugins: ["simple-import-sort"],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_", // 忽略变量名以 _ 开头
        argsIgnorePattern: "^_" // 忽略函数参数名以 _ 开头
      }
    ]
  }
}
