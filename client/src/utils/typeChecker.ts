import { Store } from '../modules/Store'
import { TransactionStore } from '../modules/TransactionStore'
import { MonthStore } from '../modules/MonthStore'

export const isTransactionStore = (
  store: Store<any>
): store is TransactionStore => {
  return store instanceof TransactionStore
}

export const isMonthStore = (store: Store<any>): store is MonthStore => {
  return store instanceof MonthStore
}
