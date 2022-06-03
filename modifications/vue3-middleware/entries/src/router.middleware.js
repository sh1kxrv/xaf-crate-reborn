export function createMiddleware(router, store) {
  router.beforeEach(async (to, from, next) => {
    if (!to.meta.middleware && !to.meta.bg_middlewares) {
      return next()
    }
    let redirected = false

    const callRedirect = (url, force = false) => {
      if (force) return (window.location = url)
      redirected = true
      // Or next({name: 'routerName'})
      router.push(url)
    }

    const callNext = (name) => {
      redirected = true
      if (name) next({ name })
      else next()
    }

    const { middleware = [], bg_middlewares = [] } = to.meta

    // Background Middleware - не требует ожидания всего рендера и работает в фоне
    for (let f of bg_middlewares) {
      f({ to, from, next: callNext, store, redirect: callRedirect })
    }

    // Middleware с блокировкой рендера
    for (let f of middleware) {
      const result = await f({
        to,
        from,
        next: callNext,
        store,
        redirect: callRedirect,
      })
      if (result === false) break
    }

    if (!redirected) next()
  })
}
