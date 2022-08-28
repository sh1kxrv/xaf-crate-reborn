module.exports = {
  extends: ['@xfcr/eslint-config'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  env: {
    node: true,
  },
}
