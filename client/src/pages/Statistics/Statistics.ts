import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { LineChart } from '../../components/LineChart'
import { PieChart } from '../../components/PieChart'
import { BarChart } from '../../components/BarChart'
import { ICon } from '../../components/ICon'

interface IProps {}
interface IState {
  isChartMode: boolean
}

// {categoryName: string, price: number}[]

class Statistics extends Component<IProps, IState> {
  constructor() {
    const state: IState = {
      isChartMode: true,
    }
    super({}, state)

    Object.setPrototypeOf(this, Statistics.prototype)
    this.connectStore('transaction', 'date')
    this.init()
  }

  renderSelector() {
    const modes = [
      { isChartMode: true, iconName: 'chart_bar' },
      { isChartMode: false, iconName: 'graph_square' },
    ]

    return div(
      { className: 'chart-selector' },
      ...modes.map(
        ({ isChartMode, iconName }) =>
          new ICon({
            isSelected: isChartMode === this.getState('isChartMode'),
            iconName,
            isIncome: isChartMode,
            onClickHandler: () => this.setState('isChartMode', isChartMode),
          })
      )
    )
  }

  filterData(): { price: number; categoryName: string }[] {
    const transaction = this.store.transaction.data
    if (!transaction) {
      return []
    }
    const sumed = transaction.reduce<{ [key: string]: number }>((acc, data) => {
      if (!acc[data.categoryName]) {
        acc[data.categoryName] = 0
      }

      acc[data.categoryName] += data.price
      return acc
    }, {})

    return Object.entries(sumed)
      .map(([key, value]) => ({ categoryName: key, price: value }))
      .sort((a, b) => a.price - b.price)
  }

  render() {
    const date = this.store.date.data
    const transaction = this.store.transaction.data

    const isChartMode = this.getState('isChartMode')
    const filteredData = this.filterData()
    return div(
      { className: 'statistics-container' },
      this.renderSelector(),
      div(
        { className: 'charts' },
        isChartMode
          ? div(
              {},
              new PieChart({
                transaction: filteredData,
              }),
              div({ className: 'spliiter' }),
              new BarChart({
                transaction: filteredData,
              })
            )
          : new LineChart({
              date,
              transaction,
            })
      )
    )
  }
}

export default Statistics
