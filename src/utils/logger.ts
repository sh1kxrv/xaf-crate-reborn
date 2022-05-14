import { bold, lightGreen, red, yellow, bgMagenta } from 'kolorist'
import { version } from '../../package.json'

export function log(message: string, prefix: string = '📦', ...args: any[]) {
  console.log(`[${prefix}] ${bold(message)}`, ...args)
}

export function successfully(message) {
  log(`${lightGreen(message)} 🪄`, '⭐️')
}

export function angry(msg) {
  log(`${red(msg)}`, '👺')
}

export function info(msg) {
  log(msg, '🐌')
}

export function warn(msg) {
  log(`${yellow(msg)}`, '🪐')
}

export function hello() {
  log(bgMagenta(` xaf-crate | v${version} `))
}
