import { Component } from '../../utils/wooact'
import { div, button } from '../../utils/wooact/defaultElements'
import { TransactionList } from '../../components/TransactionList'
import { AddNewTransaction } from '../../components/AddNewTransaction'

interface IProps {}
interface IState {}

class Transaction extends Component<IProps, IState> {
  constructor() {
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
