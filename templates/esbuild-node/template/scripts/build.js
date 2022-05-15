const { build } = require('esbuild')
const useConfig = require('./options.build')

;(async () => {
  build(useConfig(false))
})()
