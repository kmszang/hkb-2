import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import { fetchAllCategories, ICategoryResponse } from '../../api/category'
import { AddNewTransaction } from '../../components/AddNewTransaction'
import { TransactionList } from '../../components/TransactionList'

interface IProps {}
interface IState {}

class History extends Component<IProps, IState, undefined> {
  constructor() {
    super()

    Object.setPrototypeOf(this, History.prototype)
    this.init()
  }

  render() {
    return div(
      { className: 'history-container' },
      new AddNewTransaction(),
      new TransactionList()
    )
  }
}

export default History
