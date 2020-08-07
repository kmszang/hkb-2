import { promiseHandler } from './promiseHandler'
import { localUrl, deployUrl } from '../../config/url'
export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

// const baseUrl = localUrl
const baseUrl = deployUrl + '/api'

// const baseUrl = process.env.mode === 'production' ? localUrl : deployUrl

export const fetchWrapper = async <T, B>(
  method: MethodType,
  url: string,
  body?: B
): Promise<[T | null, any?]> => {
  const [response, err] = await promiseHandler(
    fetch(baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': true,
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
