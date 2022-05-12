module.exports = {
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  snapshotSerializers: ['jest-serializer-vue'],
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
}
