import { promiseHandler } from './promiseHandler'
import { localUrl, deployUrl } from '../../config/url'
export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

const baseUrl = process.env.NODE_ENV === 'production' ? deployUrl : localUrl

export const fetchWrapper = async <T, B>(
  method: MethodType,
  url: string,
  body?: B
): Promise<[T | null, any?]> => {
  const [response, err] = await promiseHandler(
    fetch(baseUrl + '/api' + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'true',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    })
  )

  if (err) {
    return [null, err]
  }
  const res = await response.json()
  return [res, null]
}
