import { fetchWrapper } from '../utils/fetchWrapper'

export interface ISignUpResponse {}

export interface ISignUpBody {
  userId: string
  password: string
}

const signup = async (body: ISignUpBody) => {
  const [signUpResponse, signUpError] = await fetchWrapper<
    ISignUpResponse,
    ISignUpBody
  >('POST', '/sign-up', body)
}
