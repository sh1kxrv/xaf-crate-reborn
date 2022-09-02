module.exports = {
  extends: ['../../node_modules/@xfcr/eslint'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  env: {
    node: true,
  },
}
