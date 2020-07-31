import { fetchWrapper } from '../utils/fetchWrapper'
import { TRANSACTION } from './apiRoutes'

export interface ICreateTransaction {
  content: string
  price: number
  paymentId: number
  userId: number
  categoryId: number
}

export interface ITransactionResponse {
  id: number
  content: string
  price: number
  paymentName: string
  categoryName: string
  createdAt: Date
  isIncome: boolean
}

export const fetchAllTransaction = async () => {
  return await fetchWrapper<ITransactionResponse[], undefined>(
    'GET',
    TRANSACTION
  )
}

export const createNewTransaction = async (args: ICreateTransaction) => {
  return await fetchWrapper<ITransactionResponse, ICreateTransaction>(
    'POST',
    TRANSACTION,
    args
  )
}
