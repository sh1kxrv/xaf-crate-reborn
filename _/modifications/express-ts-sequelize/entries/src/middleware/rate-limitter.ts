import limiter from 'express-rate-limit'
import { ServerErrors } from '~/abstract-layer/abstract.enums'
import { send_error } from '~/abstract-layer/abstract.response'
import { rate_limit } from '../../config.json'

export default limiter({
  message: send_error(
    `Превышено кол-во обращений к API в течении ${rate_limit.delay}сек.`,
    ServerErrors.TOO_MANY_REQUESTS
  ),
  max: rate_limit.max,
  windowMs: rate_limit.delay * 1000,
  statusCode: 429,
})
