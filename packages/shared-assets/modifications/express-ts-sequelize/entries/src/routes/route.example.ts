import { Route } from './route'
import { Request, Router } from 'express'
import { ExtendedResponse } from '~/middleware/extended-response'

const router = Router()

router.get('/get/:id', async (req: Request, resp: ExtendedResponse) => {
  resp.send_ok('Hello!')
})

const route: Route = {
  path: '/example',
  router,
}

export default route
