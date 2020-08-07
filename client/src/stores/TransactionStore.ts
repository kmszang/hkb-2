import {
  ITransactionResponse,
  fetchAllTransaction,
  createNewTransaction,
  ICreateTransaction,
  updateTransaction,
  deleteTransaction,
  IUpdateTransaction,
} from '../api/transaction'
import { Store } from '../utils/Store'

// actions
export const FETCH_ALL_TRANSACTION = 'Transaction/FETCH_ALL' as const
export const ADD_ONE_TRANSACTION = 'Transaction/ADD_ONE' as const
export const DELETE_TRANSACTION = 'Transaction/DELETE_TRANSACTION' as const
export const UPDATE_TRANSACTION = 'Transaction/UPDATE_TRANSACTION' as const

// connect store and actions
export class TransactionStore extends Store<ITransactionResponse[]> {
  actions = {
    [FETCH_ALL_TRANSACTION]: this.fetchAllTransactions,
    [ADD_ONE_TRANSACTION]: this.addOneTransaction,
    [DELETE_TRANSACTION]: this.deleteTransaction,
    [UPDATE_TRANSACTION]: this.updateTransaction,
  }

  constructor(initData?: ITransactionResponse[]) {
    super(initData || null)
  }

  async fetchAllTransactions(args: { year: number; month: number }) {
    const { year, month } = args
    const [fetchedTransactions, fetchError] = await fetchAllTransaction(
      year,
      month
    )
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

  async deleteTransaction(id: number) {
    const [removedTransactionCount, removeError] = await deleteTransaction(id)

    if (removeError) {
      return console.error(removeError)
    }

    return id
  }

  async updateTransaction(args: IUpdateTransaction) {
    const [updatedTransaction, updateError] = await updateTransaction(args)

    if (updateError) {
      return console.error(updateError)
    }

    return updateTransaction
  }

  protected updateStore(action: string, result: any) {
    switch (action) {
      case FETCH_ALL_TRANSACTION:
        this._data = [...result]
        break
      case ADD_ONE_TRANSACTION:
        this._data = [result, ...this._data]
        break
      case DELETE_TRANSACTION:
        this._data = this._data.filter(({ id }) => id !== result)
        break
      case UPDATE_TRANSACTION:
        this._data = this.data.map((transaction) =>
          transaction.id === result.id ? result : transaction
        )
    }
  }
}
