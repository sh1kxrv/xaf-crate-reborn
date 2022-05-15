const { build } = require('esbuild')
const chokidar = require('chokidar')

const useConfig = require('./options.build')
const { spawn, ChildProcess } = require('child_process')

/**
 * @type {ChildProcess}
 */
let process = null

;(async () => {
  const builder = await build(useConfig(true))
  chokidar
    .watch('src/**/*.{ts,tsx,js,jsx}', {
      interval: 0, // No delay
      ignoreInitial: true,
    })
    .on('all', async () => {
      if (process && !process.killed) process.kill()
      await builder.rebuild()
      process = spawn('node', ['dist/app.js'], { stdio: 'inherit' })
    })
})()
