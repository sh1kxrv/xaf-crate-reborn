import type {
  FetchGuardRejectionBody,
  FetchMethodOptions,
  FetchReviveInstance,
  FetchReviveOptions,
  FetchReviveQueries,
  FetchReviveResponse,
  FetchReviveReturn
} from '~/types/network/network-types.fetch'

function buildURL(
  base: string,
  path: string,
  queries: FetchReviveQueries | undefined
): string {
  const buildedURL = [base, path].join('')
  if (queries) {
    const queriesEntries = Object.entries(queries)
    if (queriesEntries.length > 0) {
      const buildedEntries = queriesEntries
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          const valueType = typeof value
          if (valueType === 'object' || Array.isArray(value))
            return `${key}=${JSON.stringify(value)}`
          return `${key}=${value}`
        })
        .join('&')
      return [buildedURL, buildedEntries].join(path?.includes('?') ? '&' : '?')
    }
  }
  return buildedURL
}

function isJSON() {
  // Not Implemented
  return true
}

export function createFetch({
  baseURL,
  after = [],
  guard = []
}: FetchReviveOptions): FetchReviveInstance {
  async function wrapResponse<T>(resp: Response): FetchReviveReturn<T> {
    const json = await resp.json()
    return {
      data: json,
      status: resp.status,
      isOk: () => resp.status === 200
    }
  }

  function generateReject<TMeta = unknown>(
    reason: string,
    meta: TMeta
  ): FetchGuardRejectionBody<TMeta> {
    return {
      meta,
      reason
    }
  }

  async function send<TResponse, TBody = unknown>(
    path: string,
    { method, body, headers = {}, queries }: FetchMethodOptions<TBody>
  ): FetchReviveReturn<TResponse> {
    const url = buildURL(baseURL, path, queries)
    if (guard.length > 0) {
      for (const executeGuard of guard) {
        const rejection = await executeGuard({
          body,
          reject: generateReject,
          headers
        })
        if (rejection !== undefined) return rejection
      }
    }
    const fR = await fetch(url, {
      body: isJSON() ? (JSON.stringify(body) as BodyInit) : (body as BodyInit),
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        ...headers
      }
    })
    if (after.length > 0) {
      for (const a of after) {
        await a(fR)
      }
    }
    const response = await wrapResponse(fR)
    return response as FetchReviveResponse<TResponse>
  }

  function post<TResponse = unknown, TBody = unknown>(
    path: string,
    { body, headers, queries }: FetchMethodOptions<TBody>
  ): FetchReviveReturn<TResponse> {
    return send<TResponse, TBody>(path, {
      body,
      headers,
      method: 'POST',
      queries
    })
  }

  function get<TResponse = unknown>(
    path: string,
    { headers, queries }: FetchMethodOptions
  ): FetchReviveReturn<TResponse> {
    return send<TResponse>(path, { headers, method: 'GET', queries })
  }

  function put<TResponse = unknown, TBody = unknown>(
    path: string,
    { headers, queries }: FetchMethodOptions<TBody>
  ): FetchReviveReturn<TResponse> {
    return send<TResponse, TBody>(path, { method: 'PUT', queries, headers })
  }

  function _delete<TResponse = unknown, TBody = unknown>(
    path: string,
    { headers, queries, body }: FetchMethodOptions<TBody>
  ): FetchReviveReturn<TResponse> {
    return send<TResponse, TBody>(path, {
      method: 'DELETE',
      queries,
      headers,
      body
    })
  }

  function patch<TResponse = unknown, TBody = unknown>(
    path: string,
    { headers, queries, body }: FetchMethodOptions<TBody>
  ): FetchReviveReturn<TResponse> {
    return send<TResponse, TBody>(path, {
      method: 'PATCH',
      queries,
      headers,
      body
    })
  }

  return {
    patch,
    get,
    delete: _delete,
    put,
    post
  }
}
