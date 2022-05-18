import { Route } from './route'
import { Router } from 'express'
import RouteExample from './route.example'

const router = Router()

router.use(RouteExample.path, RouteExample.router)

const route: Route = {
  path: '/api',
  router,
}

export default route
