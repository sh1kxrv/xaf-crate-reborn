#!/usr/bin/env node

import { magenta } from 'kolorist'
import { angry, hello } from '~/utils/logger'
import { CrateProject } from './crate/crate.project'
import { Crate } from './crate'

const argv = require('minimist')(process.argv.slice(2), { string: ['_'] })

type Crates = {
  [key: string]: Crate<any>
}

async function bootstrap() {
  hello()
  const crate_name = argv._[0] ?? 'project'

  const crates: Crates = {
    project: new CrateProject(),
  }
  const crate = crates[crate_name]
  if (crate) {
    crate.boot()
  } else angry(`Crate с наименованием '${crate_name}' не существует`)
}

bootstrap()
