import { promiseHandler } from './promiseHandler'

export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

export const fetchWrapper = async <T, B>(
  method: MethodType,
  url: string,
  body?: B
): Promise<[T | null, any?]> => {
  const baseUrl = 'http://localhost:3000/api'
  const [response, err] = await promiseHandler(
    fetch(baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  )

  if (err) {
    return [null, err]
  }

  const res = await response.json()
  return [res, null]
}
