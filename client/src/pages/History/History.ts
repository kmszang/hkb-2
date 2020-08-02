import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import { fetchAllCategories, ICategoryResponse } from '../../api/category'
import { AddNewTransaction } from '../../components/AddNewTransaction'
import { TransactionList } from '../../components/TransactionList'

interface IProps {}
interface IState {
  categories: ICategoryResponse[]
}

class History extends Component<IProps, IState, undefined> {
  constructor() {
    const initialState: IState = {
      categories: null,
    }
    super({ state: initialState })

    Object.setPrototypeOf(this, History.prototype)
    this.init()
  }

  async componentDidMount() {
    const [allCategories, error] = await fetchAllCategories()

    if (error) {
      console.error(error)
    }
    this.setState('categories', allCategories)
    // this.categories = allCategories
    // console.log(this.categories)
  }

  render() {
    const categories = this.getState('categories')

    return div(
      { className: 'history-container' },
      new AddNewTransaction({ props: { categories } }),
      new TransactionList()
    )
  }
}

export default History
