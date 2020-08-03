import { Store } from '../modules/Store'
import { Component } from './wooact'
import { TransactionStore } from '../modules/TransactionStore'
import { ITransactionResponse } from '../api/transaction'

interface ICombinedStore {
  tansaction: Store<ITransactionResponse[]>
}
const transactionStore = new TransactionStore()

const store: ICombinedStore = {
  tansaction: transactionStore,
}

export const connectStore = (
  storeName: keyof ICombinedStore,
  component: Component<any, any>
) => {
  store[storeName].subscribe(component)
  return store[storeName]
}
