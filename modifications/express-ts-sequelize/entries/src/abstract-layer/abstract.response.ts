import { ServerErrors } from './abstract.enums'

export class AbstractResponse<T = any> {
  constructor(
    private data: T | null,
    private ok: boolean,
    private code?: ServerErrors,
    private message?: string
  ) {}
}

export function send_error(
  message: string,
  code: ServerErrors
): AbstractResponse {
  return new AbstractResponse(null, false, code, message)
}

export function send_ok<D>(data: D | null = null): AbstractResponse<D> {
  return new AbstractResponse(data, true)
}
