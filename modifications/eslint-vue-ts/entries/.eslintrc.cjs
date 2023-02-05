/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript'
  ],
  env: {
    'vue/setup-compiler-macros': true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    parser: {
      ts: '@typescript-eslint/parser',
      js: 'espree',
      '<template>': 'espree'
    }
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
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ]
  }
}
