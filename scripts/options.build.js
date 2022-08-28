const path = require('path')

const { esbuildPluginAliasPath } = require('esbuild-plugin-alias-path')

const src = path.resolve(__dirname, '../src')

function createConfig(isDev = true) {
  return {
    bundle: true,
    entryPoints: ['src/app.ts'],
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
