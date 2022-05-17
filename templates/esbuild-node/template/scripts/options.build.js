const path = require('path')
const { entrypoint } = require('../es-xaf.config.json')
const { esbuildPluginAliasPath } = require('esbuild-plugin-alias-path')
const { esbuildPluginDecorator } = require('esbuild-plugin-decorator')

const src = path.resolve(__dirname, '../src')

function createConfig(isDev = true) {
  return {
    bundle: true,
    entryPoints: [entrypoint],
    incremental: isDev,
    minify: !isDev,
    outfile: 'dist/app.js',
    platform: 'node',

    target: 'node14',
    sourcemap: true,

    plugins: [
      esbuildPluginAliasPath({
        alias: {
          '~/*': src,
        },
      }),
    ],
  }
}

module.exports = createConfig
