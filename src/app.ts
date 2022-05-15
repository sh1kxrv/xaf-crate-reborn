#!/usr/bin/env node

import { angry, hello } from '~/utils/logger'
import { CrateProject } from './crate/crate.project'
import { CrateModification } from './crate/crate.modification'

const argv = require('minimist')(process.argv.slice(2), { string: ['_'] })

type Crates = {
  [key: string]: any
}

async function bootstrap() {
  hello()
  const crate_name = argv._[0] ?? 'project'

  const crates: Crates = {
    project: CrateProject,
    mod: CrateModification,
  }
  const crate = crates[crate_name]
  if (crate) {
    try {
      new crate().boot()
    } catch (err) {
      angry(err.message)
    }
  } else angry(`Crate с наименованием '${crate_name}' не существует`)
}

bootstrap()
