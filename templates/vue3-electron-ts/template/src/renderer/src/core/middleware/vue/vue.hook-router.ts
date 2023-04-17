import { MiddlewareController } from '~/core/middleware'
import { Middleware } from '~/types/types.middleware'
import { createRouter as createVueRouter, RouterOptions } from 'vue-router'

interface ToolkitRouter extends RouterOptions {
  middleware: boolean
  global: Middleware[]
}

export function createRouter(routerOptions: ToolkitRouter) {
  const vRouter = createVueRouter(routerOptions)
  if (routerOptions.middleware) {
    const controller = new MiddlewareController(vRouter, routerOptions.global)
    vRouter.beforeEach(controller.hook.bind(controller))
  }
  return vRouter
}
