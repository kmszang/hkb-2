import { fetchWrapper } from '../utils/fetchWrapper'
import { CATEGORY } from './apiRoutes'

export interface ICreateTransaction {
  content: string
  price: number
  paymentId: number
  userId: number
  categoryId: number
}

export interface ICategoryResponse {
  id: number
  name: string
  iconName: string
  isIncome: boolean
}

export const fetchAllCategories = async () => {
  return await fetchWrapper<ICategoryResponse[], undefined>('GET', CATEGORY)
}
