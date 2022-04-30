#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2), { string: ['_'] })

async function bootstrap() {
  console.log('xaf-esbuild-template')
}

bootstrap()
