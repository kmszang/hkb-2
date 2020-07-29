import { Component } from '../../utils/wooact'
import { div, header, p } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class Header extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // const initialState: IState = {
  //
  // }
  // constructor(props: IProps) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, Header.prototype)
    this.init()
  }

  render() {
    return header(
      {},
      p({ textContent: '가계부' }),
      div({ textContent: '결제수단관리' })
    )
  }
}

export default Header