module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript/recommended'
  ],
  plugins: ['@typescript-eslint'],
  env: {
    'vue/setup-compiler-macros': true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    parser: {
      js: 'espree',
      '<template>': 'espree',
      ts: '@typescript-eslint/parser'
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
    ],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/custom-event-name-casing': [
      'error',
      'kebab-case',
      {
        ignores: []
      }
    ],
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: []
      }
    ],
    'vue/attributes-order': [
      'warn',
      {
        order: [
          'DEFINITION',
          'OTHER_ATTR',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: false
      }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
    // '@typescript-eslint/explicit-function-return-type': 'error'
  }
}
