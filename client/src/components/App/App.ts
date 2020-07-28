import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import User from '../User/User'
interface IProps {}
interface IState {}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, App.prototype)
    this.init()
  }

  render() {
    return div({ className: 'container' }, new User())
  }
}

export default App
