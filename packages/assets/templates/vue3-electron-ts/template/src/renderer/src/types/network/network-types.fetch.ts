export type FetchReviveReturn<T> = Promise<FetchReviveResponse<T>>
export type FetchReviveHeaders = Record<string, string | number>
export type FetchReviveQueries = Record<string, unknown>
export type FetchReviveMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type FetchReviveStatus = 400 | 200 | 401 | 500 | 404 | number

export type FetchGuard<TMeta = unknown, TBody = unknown> = (
  options: FetchGuardRejectOptions<TBody, TMeta>
) => void

export type FetchReviveResponse<T> = {
  data: T
  status: FetchReviveStatus
  isOk(): boolean
}

export type FetchReviveOptions = {
  baseURL: string
  guard?: FetchGuard[]
  after?: Array<(response: Response) => void>
}

export type FetchMethodOptions<DTO = unknown> = {
  method: FetchReviveMethod
  headers?: FetchReviveHeaders
  queries?: FetchReviveQueries
  body?: DTO
}

export type FetchGuardRejectionBody<TMeta = unknown> = {
  reason: string
  meta: TMeta
}

export type FetchGuardRejectOptions<TBody = unknown, TMeta = unknown> = {
  body: TBody
  headers: FetchReviveHeaders
  reject(reason: string, meta?: TMeta): void
}

export interface FetchReviveInstance {
  patch<TResponse = unknown, TBody = unknown>(
    path: string,
    options: Omit<FetchMethodOptions<TBody>, 'method'>
  ): FetchReviveReturn<TResponse>
  get<TResponse = unknown>(
    path: string,
    options: Omit<FetchMethodOptions, 'method' | 'body'>
  ): FetchReviveReturn<TResponse>
  put<TResponse, TBody = unknown>(
    path: string,
    options: Omit<FetchMethodOptions<TBody>, 'method'>
  ): FetchReviveReturn<TResponse>
  delete<TResponse = unknown, TBody = unknown>(
    path: string,
    options: Omit<FetchMethodOptions<TBody>, 'method'>
  ): FetchReviveReturn<TResponse>
  post<TResponse = unknown, TBody = unknown>(
    path: string,
    options: Omit<FetchMethodOptions<TBody>, 'method'>
  ): FetchReviveReturn<TResponse>
}
