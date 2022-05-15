import Module from '~/packages/module/module'
import { PrismaClient } from '@prisma/client'
import type { Express } from 'express'
import AppRoutes from '~/routes/index'

export class RouterModule extends Module {
  constructor() {
    super('router-module')
  }

  async register(app: Express, prisma: PrismaClient) {
    for (const route of AppRoutes) {
      app.use(route.path, route.router)
    }
  }
}
