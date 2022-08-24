const TelegramBot = require('node-telegram-bot-api')
const ModuleExtension = require('../api/module-extension')

class Bot extends ModuleExtension {
  /**
   * @type {TelegramBot|null}
   */
  instance = null

  /**
   * @param {string} token - токен бота
   */
  constructor(token) {
    this.instance = new TelegramBot(token, { polling: true })
  }

  start() {
    this.load(this.instance)
    return this
  }
}

module.exports = Bot
