import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { TransactionList } from '../../components/TransactionList'

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
    console.log('transaction rerendered')
    return div({ className: 'transaction-container' }, new TransactionList())
  }
}

export default Transaction
