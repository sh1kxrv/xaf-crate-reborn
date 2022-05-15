import * as config from '../config.json'
import Server from '~/core/server'
import { RouterModule } from './modules/module.router'

const modules = [new RouterModule()]

function bootstrap() {
  const server = new Server(config.PORT)
  server.use(...modules).start()
}

;(async () => bootstrap())()
