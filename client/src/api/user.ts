import { fetchWrapper } from '../utils/fetchWrapper'
import { GITHUBLOGIN, LOGIN, SIGN_UP } from './apiRoutes'
import { localUrl, deployUrl } from '../../config/url'
export interface ILogInResponse {
  status: number
}

export interface ILogInBody {
  userId: string
  password: string
}

export interface ISignUpBody {
  name: string
  userId: string
  password: string
}

export const logIn = async (body: ILogInBody) => {
  const baseUrl = process.env.NODE_ENV === 'production' ? deployUrl : localUrl

  // const baseUrl = localUrl
  const loginUrl = '/api/login'
  return await fetch(`${baseUrl}${loginUrl}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'true',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
}

export const githubLogIn = async (body: ILogInBody) => {
  return await fetchWrapper<ILogInResponse, ILogInBody>(
    'POST',
    GITHUBLOGIN,
    body
  )
}
export const signUp = async (body: ISignUpBody) => {
  return await fetchWrapper<ILogInResponse, ILogInBody>('POST', SIGN_UP, body)
}
