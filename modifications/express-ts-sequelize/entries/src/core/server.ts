import { successfully } from '~/utils/logger'
import ModuleExtensions from '~/packages/module/module-extension'
import express from 'express'
import type { Express } from 'express'
import orm from '~/db/orm'
import ExtendedResponse from '~/middleware/extended-response'

export default class extends ModuleExtensions {
  private port: number
  private app: Express
  constructor(port) {
    super()
    this.port = port
    this.app = express()
    this.app.use(express.json())
    this.app.use(ExtendedResponse)
  }

  /**
   * Запуск сервера
   */
  async start() {
    await orm.connect()
    await orm.sequelize.sync()
    this.load(this.app)
    this.app.listen(this.port, () => {
      successfully(`Started up on port: ${this.port}`)
    })
  }
}
