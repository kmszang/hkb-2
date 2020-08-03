import { Component } from '../../utils/wooact'
import { div, header, p, h1 } from '../../utils/wooact/defaultElements'
import { Button } from '../Button'
import { routing, SIGN_IN, STATISTICS, CALENDAR } from '../../utils/Routing'
import { TRANSACTION } from '../../api/apiRoutes'
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
      h1({ textContent: '가계부' }),
      p({ textContent: '결제수단관리' }),
      div(
        {},
        new Button({
          value: '로그인',
          onClickHandler: () => routing.pushTo(SIGN_IN),
        }),
        new Button({
          value: '내역',
          onClickHandler: () => routing.pushTo(TRANSACTION),
        }),
        new Button({
          value: '달력',
          onClickHandler: () => routing.pushTo(CALENDAR),
        }),
        new Button({
          value: '통계',
          onClickHandler: () => routing.pushTo(STATISTICS),
        })
      )
    )
  }
}

export default Header
