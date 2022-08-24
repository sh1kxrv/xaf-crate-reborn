module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['jest', '@typescript-eslint'],
  env: {
    'jest/globals': true,
    browser: true,
    amd: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
}
