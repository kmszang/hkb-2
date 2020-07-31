import { fetchWrapper } from '../utils/fetchWrapper'
import { GITHUBLOGIN, LOGIN, SIGN_UP } from './apiRoutes'
export interface ILogInResponse {}

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
  return await fetchWrapper<ILogInResponse, ILogInBody>('POST', LOGIN, body)
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
