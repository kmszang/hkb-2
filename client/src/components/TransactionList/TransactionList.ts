import { Component } from '../../utils/wooact'
import { div, p } from '../../utils/wooact/defaultElements'
import { TransactionItem } from '../TransactionItem'
import { getCSVNumber } from '../../utils/getCSVNumber'
import { getRecordedDate, filterByDate } from '../../utils/dataFilterer'
interface IProps {}
interface IState {}

class TransactionList extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, TransactionList.prototype)
    this.connectStore('transaction', 'visible')
    this.init()
  }

  renderItems() {
    const transactions = this.store.transaction.data
    if (!transactions) {
      return [null]
    }

    const visible = this.store.visible.data
    const filteredTransaction = transactions.filter(
      ({ isIncome }) =>
        (visible.income && isIncome) || (visible.outcome && !isIncome)
    )

    console.log(filteredTransaction)

    const recordedDates = getRecordedDate(filteredTransaction)

    const filteredByDateTransaction = filterByDate(filteredTransaction)

    return recordedDates.map((date) => {
      const {
        transactions,
        sumOfIncome,
        sumOfOutcome,
      } = filteredByDateTransaction[date.toString()]

      // const {} =
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
    console.log('transaction list re-rendered')
    return div({ className: 'transaction-container' }, ...this.renderItems())
  }
}

export default TransactionList
