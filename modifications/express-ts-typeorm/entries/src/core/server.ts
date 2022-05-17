import { successfully } from '~/utils/logger'
import ModuleExtensions from '~/packages/module/module-extension'
import express from 'express'
import type { Express } from 'express'

export default class extends ModuleExtensions {
  private port: number
  private app: Express
  constructor(port) {
    super()
    this.port = port
    this.app = express()
  }

  /**
   * Запуск сервера
   */
  start() {
    this.load(this.app)
    this.app.listen(this.port, () => {
      successfully(`Started up on port: ${this.port}`)
    })
  }
}
