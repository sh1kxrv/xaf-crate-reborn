/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript/recommended'
  ],
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
    amd: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 80
      }
    ],
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: []
      }
    ],
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'vue/component-api-style': ['error', ['script-setup', 'composition']]
  }
}
