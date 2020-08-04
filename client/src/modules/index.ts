import { Store } from '../utils/wooact/Store'
import { TransactionStore } from './TransactionStore'
import { IMonth, MonthStore } from './MonthStore'
import { ITransactionResponse } from '../api/transaction'

export interface ICombinedStore {
  transaction: Store<ITransactionResponse[]>
  month: Store<IMonth>
}

const transactionStore = new TransactionStore()
const monthStore = new MonthStore()

export const combinedStore: ICombinedStore = {
  transaction: transactionStore,
  month: monthStore,
}
