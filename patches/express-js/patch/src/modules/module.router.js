const Module = require('../packages/module/module')
const express = require('express')

const AppRoutes = require('../routes')
const { PrismaClient } = require('@prisma/client')

class RouterModule extends Module {
  constructor() {
    super('router-module')
  }
  /**
   * @param {express.Express} app
   * @param {PrismaClient} prisma
   */
  async register(app, prisma) {
    for (const route of AppRoutes) {
      app.use(route.path, route.router)
    }
  }
}

module.exports = RouterModule
