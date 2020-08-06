import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { CustomDate } from '../../utils/dateInfos'
import { ITransactionInfo } from '../../utils/dataFilterer'
import { getCSVNumber } from '../../utils/getCSVNumber'

interface IProps {
  date: CustomDate
  transactions?: ITransactionInfo
}

interface IState {}

class CalendarItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, CalendarItem.prototype)
    this.init()
  }

  renderSum() {
    if (!this.props.transactions) {
      return null
    }

    const { sumOfIncome, sumOfOutcome } = this.props.transactions

    return div(
      { className: 'price-container' },
      sumOfIncome > 0
        ? div({ className: `income`, textContent: getCSVNumber(sumOfIncome) })
        : null,
      sumOfOutcome > 0
        ? div({ className: `outcome`, textContent: getCSVNumber(sumOfOutcome) })
        : null
    )
  }

  render() {
    const { date, dayName } = this.props.date

    return div(
      {
        className: `calendar-item-container ${dayName}`,
        // textContent: textContnet,
      },
      div({ className: `${dayName}`, textContent: `${date}` }),
      this.renderSum()
    )
  }
}

export default CalendarItem
