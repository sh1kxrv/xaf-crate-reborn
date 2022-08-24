import { Response } from 'express'
import { ServerErrors } from '~/abstract-layer/abstract.enums'
import { AbstractResponse } from '~/abstract-layer/abstract.response'

export interface ExtendedResponse extends Response {
  send_ok(data: any | null): void
  send_error(message: string, code: ServerErrors): void
}
export default function (req, resp: ExtendedResponse, next) {
  if (!resp.send_ok || !resp.send_error) {
    resp.send_ok = (data: any) => {
      const resp_object = new AbstractResponse(data, true)
      resp.send(resp_object)
    }
    resp.send_error = (message: string, code: ServerErrors) => {
      const resp_object = new AbstractResponse(null, false, code, message)
      resp.send(resp_object)
    }
  }
  next()
}
