import { fetchWrapper } from '../utils/fetchWrapper'
import { LOGIN, SIGN_UP } from './apiRoutes'
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

export const signUp = async (body: ISignUpBody) => {
  console.log('signup requesete')
  return await fetchWrapper<ILogInResponse, ILogInBody>('POST', SIGN_UP, body)
}
