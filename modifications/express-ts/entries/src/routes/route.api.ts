import { Route } from './route'
import { Router } from 'express'

const router = Router()

// * logic *

const route: Route = {
  path: '/api',
  router,
}

export default route
