import { bold, lightGreen, yellow, lightRed, green, white } from 'kolorist'
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
  log(green(`(${white('REBORN')}) xaf-crate | ${white(`v${version}`)}`))
}
