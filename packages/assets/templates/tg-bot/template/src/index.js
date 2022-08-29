const TgBot = require('./bootstrap/bot')
const TemplateModule = require('./modules/template.module')

const modules = [new TemplateModule()]

function bootstrap() {
  const config = require('../config.json')
  const bot = new TgBot(config.TOKEN)
  bot.use(...modules).start()
}

;(async function () {
  bootstrap()
})()
