#!/usr/bin/env node

import { magenta } from 'kolorist'
import { log } from '~/utils/logger'
import { find } from '~/utils/crate/find'
import * as path from 'path'

const argv = require('minimist')(process.argv.slice(2), { string: ['_'] })

type PatchID = string

interface CrateConfig {
  id: string
  name: string
  patches: PatchID[]
}

function hello() {
  log(magenta(`xaf-crate | v${require('../package.json').version}`))
}

async function bootstrap() {
  hello()
  const picked_crate = argv._[0] ?? 'project'
  console.log(
    find<CrateConfig>(
      path.resolve(__dirname, '../templates'),
      'crate.options.json'
    )
  )

  const crates = {
    // project:
  }
}

bootstrap()
