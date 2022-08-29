import * as config from '../config.json'
import Server from '~/core/server'
import { RouterModule } from './modules/module.router'

const modules = [new RouterModule()]

async function bootstrap() {
  const server = new Server(config.PORT)
  await server.use(...modules).start()
}

;(async () => bootstrap())()
