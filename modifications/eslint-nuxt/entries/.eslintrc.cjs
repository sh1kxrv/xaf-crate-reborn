module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: []
      }
    ],
    'vue/no-multiple-template-root': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  }
}
