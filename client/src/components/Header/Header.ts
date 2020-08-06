import { Component } from '../../utils/wooact'
import { header, p, h1, button, div } from '../../utils/wooact/defaultElements'

import { routing, SIGN_IN, STATISTICS, CALENDAR } from '../../utils/Routing'
import { TRANSACTION } from '../../api/apiRoutes'

interface IProps {
  title: string
}
interface IState {}

class Header extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, Header.prototype)
    this.init()
  }

  render() {
    return header(
      { className: 'header-container' },
      h1({ textContent: this.props.title }),
      div({
        className: 'filter-selectors',
        textContent: 'hello',
      })
      // p({ textContent: '결제수단관리' })
    )
  }
}

export default Header
