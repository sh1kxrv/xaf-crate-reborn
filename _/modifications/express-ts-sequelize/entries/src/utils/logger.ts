import { bold, magenta, red, blue } from 'kolorist'

/**
 * @param {string} msg
 * @param {string} prefix
 * @param  {...any} args ...
 */
export function log(msg: string, prefix = '📦', ...args) {
  console.log(`[${prefix}] ${bold(msg)}`, ...args)
}

export function successfully(msg: string) {
  log(`${magenta(msg)} 🪄`, '⭐️')
}

export function angry(msg: string) {
  log(`${red(msg)}`, '👺')
}

export function info(msg: string) {
  log(`${blue(msg)}`, '🌀')
}
