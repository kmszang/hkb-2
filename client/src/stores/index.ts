import { Store } from '../utils/Store'
import { TransactionStore } from './TransactionStore'
import { IVisible, VisibleStore } from './visibleStore'
import { CategoryStore } from './CategoryStore'
import { DateInfo, DateStore } from './DateStore'
import { IPayment, PaymentStore } from './PaymentStore'

import { ITransactionResponse } from '../api/transaction'
import { ICategoryResponse } from '../api/category'

export interface ICombinedStore {
  transaction: Store<ITransactionResponse[]>
  visible: Store<IVisible>
  category: Store<ICategoryResponse[]>
  date: Store<DateInfo>
  payment: Store<IPayment[]>
}

const today = new Date()
const initialDate = {
  month: today.getMonth() + 1,
  year: today.getFullYear(),
}

const transactionStore = new TransactionStore()
const visibleStore = new VisibleStore({ income: true, outcome: true })
const categoryStore = new CategoryStore()
const dateStore = new DateStore(initialDate)

export const combinedStore: ICombinedStore = {
  transaction: new TransactionStore(),
  visible: new VisibleStore({ income: true, outcome: true }),
  category: new CategoryStore(),
  date: new DateStore(initialDate),
  payment: new PaymentStore(),
}
