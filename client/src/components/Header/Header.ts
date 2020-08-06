import { Component } from '../../utils/wooact'
import { header, h1, div, span } from '../../utils/wooact/defaultElements'
import { ICon } from '../ICon'
import { TOGGLE_INCOME, TOGGLE_OUTCOME } from '../../modules/visibleStore'

interface IProps {
  title: string
}
interface IState {}

class Header extends Component<IProps, IState> {
  private sumOfIncome
  private sumOfOutcome
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, Header.prototype)
    this.connectStore('visible', 'transaction')
    this.init()
  }

  prepareData() {
    const transactions = this.store.transaction.data

    this.sumOfIncome = transactions
      ? transactions.reduce((acc, transaction) => {
          if (transaction.isIncome) {
            acc += transaction.price
          }
          return acc
        }, 0)
      : 0

    this.sumOfOutcome = transactions
      ? transactions.reduce((acc, transaction) => {
          if (!transaction.isIncome) {
            acc += transaction.price
          }
          return acc
        }, 0)
      : 0
  }

  renderFilter(isIncome: boolean) {
    const { visible } = this.store

    const key = isIncome ? 'income' : 'outcome'
    const iconName = isIncome ? 'plus' : 'minus'
    const actionName = isIncome ? TOGGLE_INCOME : TOGGLE_OUTCOME
    const priceSum = isIncome ? this.sumOfIncome : this.sumOfOutcome

    return div(
      {
        className: 'filter-selector',
      },
      div({
        className: `price-sum ${key} ${visible.data[key] ? 'selected' : ''}`,
        textContent: priceSum.toString(),
      }),
      new ICon({
        isSelected: visible.data[key],
        isIncome,
        onClickHandler: () => visible.dispatch(actionName),
        name: '',
        iconName,
      })
    )
  }

  render() {
    this.prepareData()
    console.log(this.sumOfIncome)
    console.log(this.sumOfOutcome)

    return header(
      { className: 'header-container' },
      h1({ textContent: this.props.title }),

      div(
        {
          className: 'filter-selectors',
        },
        this.renderFilter(true),
        this.renderFilter(false)
      )
    )
  }
}

export default Header
