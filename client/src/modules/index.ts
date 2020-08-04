import { Store } from '../utils/Store'
import { TransactionStore } from './TransactionStore'
import { Month, MonthStore } from './MonthStore'
import { ITransactionResponse } from '../api/transaction'

export interface ICombinedStore {
  transaction: Store<ITransactionResponse[]>
  month: Store<Month>
}

const initialMonth = new Date().getMonth() + 1

const transactionStore = new TransactionStore()
const monthStore = new MonthStore(initialMonth)

export const combinedStore: ICombinedStore = {
  transaction: transactionStore,
  month: monthStore,
}

// export const combinedStoreData = {
//   transaction: { updated: false, data: transactionStore.data },
//   month: { updated: false, data: monthStore.data },
// }

// fireEvent(STORE_UPDATED, { month: initialMonth })
