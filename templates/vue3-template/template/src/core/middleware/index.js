export class MiddlewareController {
  constructor(router, global = []) {
    this.router = router
    this.global = global
  }
  async hook(to, from, next) {
    let redirected = false
    const middlewares = to.meta?.middlewares ?? []
    for (const middleware of [...this.global, ...middlewares]) {
      const resultPipeline = await middleware({
        to,
        from,
        next: (name) => {
          redirected = true
          next({ name })
        },
        forceRedirect: (url) => (window.location = url),
        redirect: (url) => {
          redirected = true
          this.router.push(url)
        }
      })
      if (resultPipeline === false) break
    }
    if (!redirected) next()
  }
}

export * from './vue/vue.hook-router'
export * from './vue/vue.macro'
