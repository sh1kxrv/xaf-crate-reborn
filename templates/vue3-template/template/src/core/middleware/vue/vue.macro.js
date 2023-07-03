/**
 * @typedef MiddlewareOptions
 * @property {(name: string) => void} next
 * @property {(url: Location) => void} forceRedirect
 * @property {(url: string) => void} redirect
 * @property {import('vue-router').RouteLocationNormalized} to
 * @property {import('vue-router').RouteLocationNormalized} from
 * /

/**
 * @param {(options: MiddlewareOptions) => Promise<void | boolean> | (void | boolean)} middleware
 */
export function defineMiddleware(middleware = () => {}) {
  return middleware
}
