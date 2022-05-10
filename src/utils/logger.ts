import { bold, magenta, red, yellow } from 'kolorist'

export function log(message: string, prefix: string = '📦', ...args: any[]) {
  console.log(`[${prefix}] ${bold(message)}`, ...args)
}

export function successfully(message) {
  log(`${magenta(message)} 🪄`, '⭐️')
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
