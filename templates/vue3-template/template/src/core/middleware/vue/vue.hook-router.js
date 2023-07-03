import { MiddlewareController } from '~/core/middleware'
import { createRouter as createVueRouter } from 'vue-router'

/**
 * @typedef Middleware
 * @property {(name: string) => void} next
 * @property {(url: Location) => void} forceRedirect
 * @property {(url: string) => void} redirect
 * @property {import('vue-router').RouteLocationNormalized} to
 * @property {import('vue-router').RouteLocationNormalized} from
 */

/**
 * @typedef MiddlewareRouter
 * @property {Middleware[]} global
 * @property {boolean} middleware
 */

/**
 * @param {MiddlewareRouter & import('vue-router').Router} routerOptions
 */
export function createRouter(routerOptions) {
  const vRouter = createVueRouter(routerOptions)
  if (routerOptions.middleware) {
    const controller = new MiddlewareController(vRouter, routerOptions.global)
    vRouter.beforeEach(controller.hook.bind(controller))
  }
  return vRouter
}
