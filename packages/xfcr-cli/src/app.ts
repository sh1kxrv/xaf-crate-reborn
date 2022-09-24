import Yargs from 'yargs'
import { debug } from '~/terminal'

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
    const crate: string | null = get('mode')
    debug(`Crate -> ${crate ?? 'null crate'}`)
  }
}

void new App().bootstrap()
