import { bold, lightGreen, yellow, bgLightRed, bgRed, lightRed } from 'kolorist'
import { version } from '../../package.json'

export function log(message: string, prefix = '📦', ...args: any[]) {
  console.log(`[${prefix}] ${bold(message)}`, ...args)
}

export function successfully(message) {
  log(`${lightGreen(message)} 🪄`, '⭐️')
}

export function angry(msg) {
  log(`${lightRed(msg)}`, '👺')
}

export function info(msg) {
  log(msg, '🐌')
}

export function warn(msg) {
  log(`${yellow(msg)}`, '🪐')
}

export function hello() {
  log(bgRed(` xaf-crate ${bgLightRed('REBORN')} | v${version}`))
}
