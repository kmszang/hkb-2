import { Component } from '../../utils/wooact'
import { div, main } from '../../utils/wooact/defaultElements'
import {
  ITransactionResponse,
  fetchAllTransaction,
} from '../../api/transaction'
import { TransactionItem } from '../TransactionItem'

interface IProps {}
interface IState {
  transactions: ITransactionResponse[]
}

class TransactionList extends Component<IProps, IState> {
  constructor() {
    const initialState: IState = {
      transactions: [],
    }
    super({}, initialState)

    Object.setPrototypeOf(this, TransactionList.prototype)
    this.init()
  }

  async componentDidMount() {
    const [fetchedTransactions, fetchError] = await fetchAllTransaction()

    if (fetchError) {
      return console.error(fetchError)
    }
    this.setState('transactions', fetchedTransactions)
  }

  renderItems() {
    const transactions = this.getState('transactions')

    if (!transactions || transactions.length === 0) {
      return [null]
    }

    return transactions.map(
      (transaction) => new TransactionItem({ transaction })
    )
  }

  render() {
    return div({ className: 'transaction-container' }, ...this.renderItems())
  }
}

export default TransactionList
