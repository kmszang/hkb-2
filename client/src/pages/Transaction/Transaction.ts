import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import { fetchAllCategories, ICategoryResponse } from '../../api/category'
import { AddNewTransaction } from '../../components/AddNewTransaction'
import { TransactionList } from '../../components/TransactionList'

interface IProps {}
interface IState {}

class Transaction extends Component<IProps, IState> {
  constructor(oldState?: IState) {
    super()

    Object.setPrototypeOf(this, Transaction.prototype)
    this.init()
  }

  render() {
    return div(
      { className: 'transaction-container' },
      new AddNewTransaction(),
      new TransactionList()
    )
  }
}

export default Transaction
