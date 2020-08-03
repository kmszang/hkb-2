import {
  ITransactionResponse,
  fetchAllTransaction,
  createNewTransaction,
  ICreateTransaction,
} from '../api/transaction'
import { Store } from './Store'

// actions
export const FETCH_ALL_TRANSACTION = 'Transaction/FETCH_ALL' as const
export const ADD_ONE_TRANSACTION = 'Transaction/ADD_ONE' as const

// connect store and actions
export class TransactionStore extends Store<ITransactionResponse[]> {
  actions = {
    [FETCH_ALL_TRANSACTION]: this.fetchAllTransactions,
    [ADD_ONE_TRANSACTION]: this.addOneTransaction,
  }

  constructor(initData?: ITransactionResponse[]) {
    super(initData || null)
  }

  async fetchAllTransactions() {
    const [fetchedTransactions, fetchError] = await fetchAllTransaction()
    if (fetchError) {
      return console.error(fetchError)
    }

    return fetchedTransactions
  }

  async addOneTransaction(inputs: ICreateTransaction) {
    const [createdTransaction, createError] = await createNewTransaction(inputs)
    if (createError) {
      return console.error(createError)
    }

    return createdTransaction
  }

  protected updateStore(action: string, result: any) {
    switch (action) {
      case FETCH_ALL_TRANSACTION:
        this.data = [...result]
        break
      case ADD_ONE_TRANSACTION:
        this.data = [...this.data, result]
        break
    }
  }
}
