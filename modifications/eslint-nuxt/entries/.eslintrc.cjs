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
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  }
}
