import { CrateProject, CrateMixin } from '@xfcr/core'
import Yargs from 'yargs'
import { error } from '~/terminal'

async function parse_cli() {
  const yargs = Yargs(process.argv.slice(2))
  const argv = await yargs.argv
  function get<T>(key: string): T | null {
    return argv[key] as T | null
  }
  return {
    get,
    argv,
  }
}
class App {
  async bootstrap() {
    const { get } = await parse_cli()
    const crate: string | null = get('crate')
    if (crate === 'project') {
      new CrateProject().execute()
    } else if (crate === 'mixin') {
      new CrateMixin().execute()
    } else {
      error(`Crate -> '${crate ?? 'null crate'}' not found`)
    }
  }
}

void new App().bootstrap()
