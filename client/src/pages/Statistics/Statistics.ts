import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class Statistics extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Statistics.prototype)
    this.init()
  }

  render() {
    return div({ className: 'statistics-container' })
  }
}

export default Statistics
