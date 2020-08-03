import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { Login } from '../Login/index'
import { Header } from '../Header/index'
import { Signup } from '../Signup/index'
import { TransactionList } from '../TransactionList'
import { AddNewTransaction } from '../AddNewTransaction'
import { routing } from '../../utils/Routing'

interface IProps {}
interface IState {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, App.prototype)
    routing.init(this)
    this.init()
  }

  render() {
    return div({}, new Header(), routing.getPage())
  }
}

export default App
