module.exports = {
  root: true,
  env: { node: true, 'vue/setup-compiler-macros': true },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: { parser: '@babel/eslint-parser' },
  rules: { 'no-unused-vars': 'warn', 'vue/multi-word-component-names': 'off', 'no-empty': 'off' }
}
