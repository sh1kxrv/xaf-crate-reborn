const config = require('../config.json')
const Server = require('./core/server')

const { RouterModule } = require('./modules')

const modules = [new RouterModule()]

function bootstrap() {
  const server = new Server(config.PORT)
  server.use(...modules).start()
}

;(async () => bootstrap())()
