import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import {
  getFullDateIn,
  getFormattedDate,
  DAY_IN_ENG,
} from '../../utils/dateInfos'
import { CalendarItem } from '../../components/CalendarItem'
import { filterByDate } from '../../utils/dataFilterer'

interface IProps {}
interface IState {}

const NUMBER_OF_GRID = 42

class Calendar extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Calendar.prototype)
    this.connectStore('transaction', 'date', 'visible')
    this.init()
  }

  getFullDate() {
    const date = this.store.date.data
    if (!date) {
      return []
    }

    const { month, year } = date
    const currentMonth = getFullDateIn(year, month)
    const previousMonth = getFullDateIn(year, month - 1)
    const nextMonth = getFullDateIn(year, month + 1)
    const firstDay = currentMonth[0]

    const prevLength = previousMonth.length - firstDay.day
    const nextLength = NUMBER_OF_GRID - (firstDay.day + currentMonth.length)

    return [
      ...previousMonth.slice(prevLength),
      ...currentMonth,
      ...nextMonth.slice(0, nextLength),
    ]
  }

  renderDayInEng() {
    return DAY_IN_ENG.map((eng) =>
      div({ className: `day-eng ${eng}`, textContent: eng })
    )
  }

  renderItems() {
    const fullDate = this.getFullDate()
    if (!fullDate || fullDate.length === 0) {
      return [null]
    }

    const transactions = this.store.transaction.data

    if (!transactions || transactions.length === 0) {
      return fullDate.map((date) => {
        return new CalendarItem({ date, transactions: null })
      })
    }

    const visible = this.store.visible.data
    const filteredTransaction = transactions.filter(
      ({ isIncome }) =>
        (visible.income && isIncome) || (visible.outcome && !isIncome)
    )

    const filteredByDateTransactions = filterByDate(filteredTransaction)
    return fullDate.map((date) => {
      const keyDate = getFormattedDate(date)
      const transactionsOfDate = filteredByDateTransactions[keyDate]
      return new CalendarItem({ date, transactions: transactionsOfDate })
    })
  }

  render() {
    return div(
      { className: 'calendar-container' },
      div(
        { className: 'calendar-table' },
        ...this.renderDayInEng(),
        ...this.renderItems()
      )
    )
  }
}

export default Calendar
