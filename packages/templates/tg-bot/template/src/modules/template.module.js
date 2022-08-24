const TelegramBot = require('node-telegram-bot-api')
const Module = require('../api/module')

class TemplateModule extends Module {
  constructor() {
    super('template-module')
  }
  /**
   * @param {TelegramBot}
   */
  register(bot) {
    console.log('im template module')
  }
}

module.exports = TemplateModule
