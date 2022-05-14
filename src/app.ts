#!/usr/bin/env node

import { angry, hello } from '~/utils/logger'
import { CrateProject } from './crate/crate.project'
import { Crate } from './crate'
import { CratePatch } from './crate/crate.patches'

const argv = require('minimist')(process.argv.slice(2), { string: ['_'] })

type Crates = {
  [key: string]: any
}

async function bootstrap() {
  hello()
  const crate_name = argv._[0] ?? 'project'

  const crates: Crates = {
    project: CrateProject,
    patch: CratePatch,
  }
  const crate = crates[crate_name]
  if (crate) {
    new crate().boot()
  } else angry(`Crate с наименованием '${crate_name}' не существует`)
}

bootstrap()
