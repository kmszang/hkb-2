import { Component } from '../../utils/wooact'
import { div, p, data } from '../../utils/wooact/defaultElements'
import { ITransactionResponse } from '../../api/transaction'
import { TransactionItem } from '../TransactionItem'
import { getCSVNumber } from '../../utils/getCSVNumber'
import { FETCH_ALL_TRANSACTION } from '../../modules/TransactionStore'
import { getRecordedDate, filterByDate } from '../../utils/dataFilterer'
interface IProps {}
interface IState {}

class TransactionList extends Component<IProps, IState> {
  private totalIncome: number
  private totalOutcome: number

  constructor() {
    const initialState: IState = {
      transactions: [],
    }
    super({}, initialState)

    Object.setPrototypeOf(this, TransactionList.prototype)
    this.connectStore('transaction')
    this.init()

    this.totalIncome = 0
    this.totalOutcome = 0
  }

  renderItems() {
    const transactions = this.store.transaction.data

    if (!transactions) {
      return [null]
    }

    const recordedDates = getRecordedDate(transactions)

    const filteredByDateTransaction = filterByDate(transactions)

    return recordedDates.map((date, id) => {
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
          div(
            {
              className: 'price-summary right',
            },
            p({
              className: 'income',
              textContent: getCSVNumber(sumOfIncome),
            }),
            p({
              className: 'outcome',
              textContent: getCSVNumber(sumOfOutcome),
            })
          )
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
