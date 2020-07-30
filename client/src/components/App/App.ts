import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { Login } from '../Login/index'
import { Header } from '../Header/index'
import { Signup } from '../Signup/index'
interface IProps {}
interface IState {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, App.prototype)
    this.init()
  }

  render() {
    return div({}, new Header(), new Login(), new Signup())
  }
}

export default App
