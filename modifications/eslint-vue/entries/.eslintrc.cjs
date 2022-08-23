/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    amd: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 120,
      },
    ],
  },
}
