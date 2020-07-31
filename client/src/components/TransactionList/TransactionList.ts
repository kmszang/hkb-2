import { Component } from '../../utils/wooact'
import { div, p } from '../../utils/wooact/defaultElements'
import {
  ITransactionResponse,
  fetchAllTransaction,
} from '../../api/transaction'
import { TransactionItem } from '../TransactionItem'
import { getCSVNumber } from '../../utils/getCSVNumber'

interface IProps {}
interface IState {
  transactions: ITransactionResponse[]
}

interface IFilteredByDayTransactions {
  [date: string]: {
    transactions: ITransactionResponse[]
    sumOfIncome: number
    sumOfOutcome: number
  }
}

class TransactionList extends Component<IProps, IState> {
  private totalIncome: number
  private totalOutcome: number

  constructor() {
    const initialState: IState = {
      transactions: [],
    }
    super({}, initialState)

    Object.setPrototypeOf(this, TransactionList.prototype)
    this.init()
    this.totalIncome = 0
    this.totalOutcome = 0
  }

  async componentDidMount() {
    const [fetchedTransactions, fetchError] = await fetchAllTransaction()

    if (fetchError) {
      return console.error(fetchError)
    }
    this.setState('transactions', fetchedTransactions)
  }

  getFilteredByDayTransactions(
    transactions: ITransactionResponse[]
  ): IFilteredByDayTransactions {
    return transactions.reduce<IFilteredByDayTransactions>(
      (acc, transaction) => {
        const key = transaction.createdAt.toString().split('T')[0]
        if (!acc[key]) {
          acc[key] = { transactions: [], sumOfOutcome: 0, sumOfIncome: 0 }
        }

        acc[key].transactions.push(transaction)

        if (transaction.isIncome) {
          acc[key].sumOfIncome += transaction.price
          this.totalIncome += transaction.price
        } else {
          acc[key].sumOfOutcome += transaction.price
          this.totalOutcome += transaction.price
        }

        return acc
      },
      {}
    )
  }

  renderItems() {
    const transactions = this.getState('transactions')

    if (!transactions || transactions.length === 0) {
      return [null]
    }

    const getNumDate = (date: string) => parseInt(date.split('-')[2])

    const recordedDates = Array.from(
      new Set(
        transactions.map(({ createdAt }) => createdAt.toString().split('T')[0])
      )
    ).sort((a, b) => getNumDate(b) - getNumDate(a))

    const filteredByDateTransaction = this.getFilteredByDayTransactions(
      transactions
    )

    return recordedDates.map((date) => {
      const {
        transactions,
        sumOfIncome,
        sumOfOutcome,
      } = filteredByDateTransaction[date.toString()]
      return div(
        { className: 'date-grouped-container' },
        div(
          { className: 'date-info-container' },
          p({ className: 'date-info', textContent: date.toString() }),
          p({
            className: 'date-info income right',
            textContent: getCSVNumber(sumOfIncome),
          }),
          p({
            className: 'date-info outcome right',
            textContent: getCSVNumber(sumOfOutcome),
          })
        ),
        ...transactions.map(
          (transaction) => new TransactionItem({ transaction })
        )
      )
    })
  }

  render() {
    return div({ className: 'transaction-container' }, ...this.renderItems())
  }
}

export default TransactionList
