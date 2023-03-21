import type { Middleware } from '~/types/types.middleware'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordName
} from 'vue-router'

class MiddlewareSupport {
  constructor(
    private readonly router: Router,
    private readonly global: Middleware[]
  ) {}
  async hook(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    let redirected = false
    const middlewares = (to.meta?.middlewares as Middleware[]) ?? []
    for (const middleware of [...this.global, ...middlewares]) {
      const resultPipeline = await middleware({
        to,
        from,
        redirect: (name: RouteRecordName) => {
          redirected = true
          next({ name })
        },
        forceRedirect: (url: Location) => (window.location = url),
        next: (url: string) => this.router.push(url)
      })
      if (resultPipeline === false) break
    }
    if (!redirected) next()
  }
}

export function hookMiddleware(router: Router, ...global: Middleware[]) {
  const middleware = new MiddlewareSupport(router, global)
  router.beforeEach(async (to, from, next) => {
    if (!to.meta.middleware && global.length === 0) return next()
    await middleware.hook(to, from, next)
  })
}
