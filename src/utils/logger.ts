import { bold, lightGreen, yellow, lightRed, green, white } from 'kolorist'
import { version } from '../../package.json'

export function log(message: string, prefix = '📦', ...args: unknown[]) {
  console.log(`[${prefix}] ${bold(message)}`, ...args)
}

export function successfully(message: string) {
  log(`${lightGreen(message)} 🪄`, '⭐️')
}

export function angry(msg: string) {
  log(`${lightRed(msg)}`, '👺')
}

export function info(msg: string) {
  log(msg, '🐌')
}

export function warn(msg: string) {
  log(`${yellow(msg)}`, '🪐')
}

export function hello() {
  log(green(`(${white('REBORN')}) xaf-crate | ${white(`v${version}`)}`))
}
