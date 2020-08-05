import { Store } from '../utils/Store'
import { TransactionStore } from './TransactionStore'
import { Month, MonthStore } from './MonthStore'
import { CategoryStore } from './CategoryStore'
import { ITransactionResponse } from '../api/transaction'
import { ICategoryResponse } from '../api/category'

export interface ICombinedStore {
  transaction: Store<ITransactionResponse[]>
  month: Store<Month>
  category: Store<ICategoryResponse[]>
}

const initialMonth = new Date().getMonth() + 1

const transactionStore = new TransactionStore()
const monthStore = new MonthStore(initialMonth)
const categoryStore = new CategoryStore()

export const combinedStore: ICombinedStore = {
  transaction: transactionStore,
  month: monthStore,
  category: categoryStore,
}

// export const combinedStoreData = {
//   transaction: { updated: false, data: transactionStore.data },
//   month: { updated: false, data: monthStore.data },
// }

// fireEvent(STORE_UPDATED, { month: initialMonth })
