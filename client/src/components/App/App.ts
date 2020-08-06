import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { RouterComponent } from '../../pages/Router'
import { FETCH_ALL_TRANSACTION } from '../../stores/TransactionStore'
import { FETCH_ALL_CATEGORIES } from '../../stores/CategoryStore'
import { SideBar } from '../SideBar'

interface IProps {}
interface IState {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, App.prototype)
    this.connectAction('transaction', 'category')
    this.init()
  }

  async componentDidMount() {
    const today = new Date()
    const initialDate = {
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    }

    this.store.transaction.dispatch(FETCH_ALL_TRANSACTION, {
      ...initialDate,
    })
    this.store.category.dispatch(FETCH_ALL_CATEGORIES)
  }

  render() {
    const router = new RouterComponent()

    return div({}, new SideBar({ routing: router.routing }), router)
  }
}

export default App
