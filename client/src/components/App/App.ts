import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { Header } from '../Header/index'
import { routing } from '../../utils/Routing'
import { FETCH_ALL_TRANSACTION } from '../../modules/TransactionStore'
import { FETCH_ALL_CATEGORIES } from '../../modules/CategoryStore'
import { SideBar } from '../SideBar'

interface IProps {}
interface IState {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, App.prototype)
    this.connectStore('transaction', 'category')
    routing.init(this)
    this.init()
  }

  async componentDidMount() {
    this.store.transaction.dispatch(FETCH_ALL_TRANSACTION)
    this.store.category.dispatch(FETCH_ALL_CATEGORIES)
  }

  render() {
    return div({}, new Header(), new SideBar(), routing.getPage())
  }
}

export default App
