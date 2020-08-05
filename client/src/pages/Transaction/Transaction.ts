import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import { fetchAllCategories, ICategoryResponse } from '../../api/category'
import { AddNewTransaction } from '../../components/AddNewTransaction'
import { TransactionList } from '../../components/TransactionList'
import { CHANGE_MONTH } from '../../modules/MonthStore'

interface IProps {}
interface IState {
  isAddMode: boolean
}

class Transaction extends Component<IProps, IState> {
  constructor() {
    const state = { isAddMode: false }
    super({}, state)

    Object.setPrototypeOf(this, Transaction.prototype)
    this.connectStore('month')
    this.init()
  }

  render() {
    return div(
      { className: 'transaction-container' },
      button({
        textContent: 'month',
        onclick: () =>
          this.store.month.dispatch(CHANGE_MONTH, this.store.month.data + 1),
      }),
      div({ textContent: this.store.month.data.toString() }),
      new AddNewTransaction({ isAddMode: this.getState('isAddMode') }),
      new TransactionList()
    )
  }
}

export default Transaction
