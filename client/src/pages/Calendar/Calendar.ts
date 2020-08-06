import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import {
  getFullDateIn,
  getFormattedDate,
  DAY_IN_ENG,
  getDate,
} from '../../utils/dateInfos'
import { CalendarItem } from '../../components/CalendarItem'
import { filterByDate } from '../../utils/dataFilterer'
import { Header } from '../../components/Header'

interface IProps {}
interface IState {}

const NUMBER_OF_GRID = 42

class Calendar extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Calendar.prototype)
    this.connectStore('transaction')
    this.init()
  }

  getFullDate() {
    const transactions = this.store.transaction.data
    const dateInfo = getDate(transactions)

    if (!dateInfo) {
      return []
    }

    const { month, year } = dateInfo
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
      div({ className: 'day-eng', textContent: eng })
    )
  }

  renderItems() {
    const fullDate = this.getFullDate()
    if (!fullDate || fullDate.length === 0) {
      return [null]
    }

    const transactions = this.store.transaction.data
    if (!transactions || transactions.length === 0) {
      return [null]
    }

    const filteredByDateTransactions = filterByDate(transactions)
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
