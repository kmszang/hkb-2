import { Component } from '../../utils/wooact'
import { div, p } from '../../utils/wooact/defaultElements'
import { TransactionItem } from '../TransactionItem'
import { getCSVNumber } from '../../utils/getCSVNumber'
import { getRecordedDate, filterByDate } from '../../utils/dataFilterer'
import { DAY_IN_ENG } from '../../utils/dateInfos'
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

    const recordedDates = getRecordedDate(filteredTransaction)

    const filteredByDateTransaction = filterByDate(filteredTransaction)

    return recordedDates.map((date) => {
      const {
        transactions,
        sumOfIncome,
        sumOfOutcome,
      } = filteredByDateTransaction[date.toString()]

      const dateData = new Date(date)
      const dateInfo = `[${DAY_IN_ENG[dateData.getDay()]}] ${
        dateData.getMonth() + 1
      }.${dateData.getDate()}`

      return div(
        { className: 'date-grouped-container' },
        div(
          { className: 'date-info-container' },
          p({ className: 'date-info', textContent: dateInfo }),
          div(
            {
              className: 'price-summary right',
            },
            sumOfIncome > 0
              ? p({
                  className: 'income',
                  textContent: getCSVNumber(sumOfIncome),
                })
              : null,
            sumOfOutcome > 0
              ? p({
                  className: 'outcome',
                  textContent: getCSVNumber(sumOfOutcome),
                })
              : null
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
