/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  plugins: ['jest'],
  env: {
    'vue/setup-compiler-macros': true,
    'jest/globals': true,
    browser: true,
    amd: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 120,
      },
    ],
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: [],
      },
    ],
  },
}
