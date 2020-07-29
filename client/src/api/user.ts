import { fetchWrapper } from '../utils/fetchWrapper'
import { LOGIN } from './apiRoutes'
export interface ILogInResponse {}

export interface ILogInBody {
  userId: string
  password: string
}

const logIn = async (body: ILogInBody) => {
  return await fetchWrapper<ILogInResponse, ILogInBody>('POST', LOGIN, body)
}

export { logIn }
