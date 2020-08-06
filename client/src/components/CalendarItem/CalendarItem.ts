import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { CustomDate } from '../../utils/dateInfos'
import { ITransactionInfo } from '../../utils/dataFilterer'

interface IProps {
  date: CustomDate
  transactions?: ITransactionInfo
}

interface IState {}

class CalendarItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, CalendarItem.prototype)

    this.connectStore()
    this.init()
  }

  render() {
    const { month, date, dayName } = this.props.date
    let textContnet = `${month}-${date}-${dayName}`
    if (this.props.transactions) {
      const { sumOfIncome, sumOfOutcome } = this.props.transactions
      textContnet += `\n+${sumOfIncome}\n-${sumOfOutcome}`
    }

    return div({
      className: 'calendar-item-container',
      textContent: textContnet,
    })
  }
}

export default CalendarItem
