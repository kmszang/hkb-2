import { fetchWrapper } from '../utils/fetchWrapper'
import { GITHUBLOGIN, SIGN_UP, CURRENT_USER, LOGOUT } from './apiRoutes'
import { localUrl, deployUrl } from '../../config/url'
export interface ICurrentUser {
  id: number
}

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

export const getCurrentUser = async () => {
  return await fetchWrapper<ICurrentUser, undefined>('GET', CURRENT_USER)
}

export const logout = async () => {
  return await fetchWrapper<undefined, undefined>('GET', LOGOUT)
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
