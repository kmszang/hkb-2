import { fetchWrapper } from '../utils/fetchWrapper'
import { PAYMENT, USER } from './apiRoutes'

export interface IPaymentCreateBody {
  paymentId: number
}

export interface IPaymentResponse {
  id: number
  name: string
}

export const fetchAllPayment = async () => {
  return await fetchWrapper<IPaymentResponse[], undefined>('GET', PAYMENT)
}

export const fetchUsersPayment = async () => {
  return await fetchWrapper<IPaymentResponse[], undefined>(
    'GET',
    PAYMENT + USER
  )
}

export const createNewPayment = async (args: IPaymentCreateBody) => {
  return await fetchWrapper<number, IPaymentCreateBody>('POST', PAYMENT, args)
}

export const deletePayment = async (args: IPaymentCreateBody) => {
  return await fetchWrapper<number, IPaymentCreateBody>('DELETE', PAYMENT, args)
}
