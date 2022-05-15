export function createMiddleware(router, store) {
  router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
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

    const middlewares = to.meta.middleware

    for (let middleware of middlewares) {
      middleware({ to, from, next: callNext, store, redirect: callRedirect })
    }

    if (!redirected) next()
  })
}
