#!/usr/bin/env node

import { angry, hello } from '~/utils/logger'
import { CrateProject } from './crate/crate.project'
import { CrateModification } from './crate/crate.modification'
import argv from 'minimist'
import type { ParsedArgs } from 'minimist'
import { isCommand } from './command'
import { Crate } from './crate'
import { UnitConfig } from './crate/interfaces/interface.config'

const args: ParsedArgs = argv(process.argv.slice(2), { string: ['_'] })

type Crates<T extends UnitConfig> = Record<string, Crate<T>>

// Todo: Переписать bootstrap на считывание команд а только потом уже запускать крейт или что-то другое

async function bootstrap() {
  hello()
  const crate_name: string = args._[0]

  const crates: Crates<UnitConfig> = {
    project: new CrateProject(),
    mod: new CrateModification(),
  }
  const crate = crates[crate_name]
  if (crate) {
    try {
      await crate.boot()
    } catch (err: unknown) {
      // angry(err)
    }
  } else if (isCommand(crate_name)) {
    console.log('1234')
  } else {
    angry(`Crate с наименованием '${crate_name}' не существует`)
  }
}

void bootstrap()
