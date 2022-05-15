const { bold, magenta, red, blue } = require('kolorist')

/**
 * @param {string} msg
 * @param {string} prefix
 * @param  {...any} args ...
 */
function log(msg, prefix = '📦', ...args) {
  console.log(`[${prefix}] ${bold(msg)}`, ...args)
}

function successfully(msg) {
  log(`${magenta(msg)} 🪄`, '⭐️')
}

function angry(msg) {
  log(`${red(msg)}`, '👺')
}

function info(msg) {
  log(`${blue(msg)}`, '🌀')
}

module.exports = {
  log,
  successfully,
  angry,
  info,
}
