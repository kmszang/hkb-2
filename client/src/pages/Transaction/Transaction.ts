import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { AddNewTransaction } from '../../components/AddNewTransaction'
import { TransactionList } from '../../components/TransactionList'
import { Header } from '../../components/Header'

interface IProps {}
interface IState {
  isAddMode: boolean
}

class Transaction extends Component<IProps, IState> {
  constructor() {
    const state = { isAddMode: false }
    super({}, state)

    Object.setPrototypeOf(this, Transaction.prototype)
    this.init()
  }

  render() {
    return div(
      { className: 'transaction-container' },
      new Header({ title: 'Transactions' }),
      // new AddNewTransaction({ isAddMode: this.getState('isAddMode') }),
      new TransactionList()
    )
  }
}

export default Transaction
