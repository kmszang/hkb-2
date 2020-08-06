import { Store } from '../utils/Store'
import { TransactionStore } from './TransactionStore'
import { IVisible, VisibleStore } from './visibleStore'
import { CategoryStore } from './CategoryStore'
import { ITransactionResponse } from '../api/transaction'
import { ICategoryResponse } from '../api/category'

export interface ICombinedStore {
  transaction: Store<ITransactionResponse[]>
  visible: Store<IVisible>
  category: Store<ICategoryResponse[]>
}

const transactionStore = new TransactionStore()
const visibleStore = new VisibleStore({ income: true, outcome: true })
const categoryStore = new CategoryStore()

export const combinedStore: ICombinedStore = {
  transaction: transactionStore,
  visible: visibleStore,
  category: categoryStore,
}

// export const combinedStoreData = {
//   transaction: { updated: false, data: transactionStore.data },
//   month: { updated: false, data: monthStore.data },
// }

// fireEvent(STORE_UPDATED, { month: initialMonth })
