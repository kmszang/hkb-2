import { Store } from './Store'
import { TransactionStore } from '../modules/TransactionStore'
import { DateStore } from '../modules/DateStore'

export const isTransactionStore = (
  store: Store<any>
): store is TransactionStore => {
  return store instanceof TransactionStore
}

export const isMonthStore = (store: Store<any>): store is DateStore => {
  return store instanceof DateStore
}
