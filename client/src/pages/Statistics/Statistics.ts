import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { LineChart } from '../../components/LineChart'
import { PieChart } from '../../components/PieChart'
import { BarChart } from '../../components/BarChart'

interface IProps {}
interface IState {}

class Statistics extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Statistics.prototype)
    this.connectStore('transaction')
    this.connectStore('date')
    this.init()
  }

  render() {
    const date = this.store.date.data
    const transaction = this.store.transaction.data
    return div(
      { className: 'statistics-container' },
      new PieChart({
        transaction,
      }),
      new BarChart({
        transaction,
      }),
      new LineChart({
        date,
        transaction,
      })
    )
  }
}

export default Statistics
