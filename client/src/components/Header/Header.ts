import { Component } from '../../utils/wooact'
import { header, p, h1, button } from '../../utils/wooact/defaultElements'

import { routing, SIGN_IN, STATISTICS, CALENDAR } from '../../utils/Routing'
import { TRANSACTION } from '../../api/apiRoutes'

interface IProps {}
interface IState {}

class Header extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Header.prototype)
    this.init()
  }

  render() {
    return header(
      {},
      h1({ textContent: '가계부' }),
      p({ textContent: '결제수단관리' })
    )
  }
}

export default Header
