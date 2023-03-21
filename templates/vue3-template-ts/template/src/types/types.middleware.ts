import type { RouteLocationNormalized } from 'vue-router'
type Next = (name: string) => void
type ForceRedirect = (url: Location) => void
type Redirect = (url: string) => void

export interface MiddlewareOptions {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: Next
  forceRedirect: ForceRedirect
  redirect: Redirect
}

export type Middleware = (options: MiddlewareOptions) => Promise<void | boolean>
