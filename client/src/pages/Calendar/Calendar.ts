import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class Calendar extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Calendar.prototype)
    this.init()
  }

  render() {
    return div({ className: 'calendar-container', textContent: 'calendar' })
  }
}

export default Calendar
