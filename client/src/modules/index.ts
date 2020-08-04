import { Store } from '../utils/wooact/Store'
import { Component } from '../utils/wooact'
import { TransactionStore } from './TransactionStore'
import { IMonth, MonthStore } from './MonthStore'
import { ITransactionResponse } from '../api/transaction'

export interface ICombinedStore {
  // [storeName: string]: Store<any>
  transaction: Store<ITransactionResponse[]>
  month: Store<IMonth>
}

const transactionStore = new TransactionStore()
const monthStore = new MonthStore()

export const combinedStore: ICombinedStore = {
  transaction: transactionStore,
  month: monthStore,
}

// export const connectStore = (
//   storeName: keyof ICombinedStore,
//   component: Component<any, any>
// ) => {
//   combinedStore[storeName].subscribe(component)
//   return combinedStore[storeName]
// }
