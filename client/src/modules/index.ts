import { Store } from '../utils/Store'
import { TransactionStore } from './TransactionStore'
import { DateInfo, DateStore } from './DateStore'
import { CategoryStore } from './CategoryStore'
import { ITransactionResponse } from '../api/transaction'
import { ICategoryResponse } from '../api/category'

export interface ICombinedStore {
  transaction: Store<ITransactionResponse[]>
  date: Store<DateInfo>
  category: Store<ICategoryResponse[]>
}
const today = new Date()
const initialDate: DateInfo = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
}

const transactionStore = new TransactionStore()
const dateStore = new DateStore(initialDate)
const categoryStore = new CategoryStore()

export const combinedStore: ICombinedStore = {
  transaction: transactionStore,
  date: dateStore,
  category: categoryStore,
}

// export const combinedStoreData = {
//   transaction: { updated: false, data: transactionStore.data },
//   month: { updated: false, data: monthStore.data },
// }

// fireEvent(STORE_UPDATED, { month: initialMonth })
