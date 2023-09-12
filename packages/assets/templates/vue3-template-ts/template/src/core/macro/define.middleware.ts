import { Middleware } from '~/types/types.middleware'

export function defineMiddleware(guard: Middleware) {
  return guard
}
