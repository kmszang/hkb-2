import { fetchWrapper } from '../utils/fetchWrapper'
import { TRANSACTION } from './apiRoutes'

export interface ICreateTransaction {
  content: string
  price: number
  paymentId: number
  userId: number
  categoryId: number
}

export interface IUpdateTransaction extends Partial<ICreateTransaction> {
  id: number
}

export interface ITransactionResponse {
  id: number
  content: string
  price: number
  paymentName: string
  categoryName: string
  createdAt: Date
  isIncome: boolean
  iconName: string
}

export const fetchAllTransaction = async (year: number, month: number) => {
  const date = `${year}-${month}`
  return await fetchWrapper<ITransactionResponse[], undefined>(
    'GET',
    TRANSACTION + `/${date}`
  )
}

export const createNewTransaction = async (args: ICreateTransaction) => {
  return await fetchWrapper<ITransactionResponse, ICreateTransaction>(
    'POST',
    TRANSACTION,
    args
  )
}

export const updateTransaction = async (args: IUpdateTransaction) => {
  return await fetchWrapper<ITransactionResponse, IUpdateTransaction>(
    'PUT',
    TRANSACTION,
    args
  )
}

export const deleteTransaction = async (id: number) => {
  return await fetchWrapper<ITransactionResponse, IUpdateTransaction>(
    'PUT',
    TRANSACTION + `/${id}`
  )
}
