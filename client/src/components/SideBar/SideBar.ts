import { Component } from '../../utils/wooact'
import { div, button } from '../../utils/wooact/defaultElements'
import { ICon } from '../ICon'
import {
  SIGN_IN,
  TRANSACTION,
  CALENDAR,
  STATISTICS,
  routing,
} from '../../utils/Routing'

interface IProps {}
interface IState {}

class SideBar extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, SideBar.prototype)

    this.init()
  }

  renderRoutes() {
    const routes = [SIGN_IN, TRANSACTION, CALENDAR, STATISTICS]
    const icons = ['lock', 'list_dash', 'calendar', 'chart_bar']

    //checkmark_alt_circle
    //
    return routes.map(
      (route, idx) =>
        new ICon({
          isSelected: false,
          onClickHandler: () => routing.pushTo(route),
          name: '',
          iconName: icons[idx],
        })
    )
  }

  render() {
    return div(
      { className: 'sidebar-container' },
      div({ className: 'icon-wrapper' }, ...this.renderRoutes()),
      new ICon({
        isSelected: false,
        onClickHandler: () => routing.pushTo(SIGN_IN),
        name: '',
        iconName: 'person_alt_circle',
      })
      // button({
      //   textContent: '로그인',
      //   onclick: () => routing.pushTo(SIGN_IN),
      // }),
      // button({
      //   textContent: '내역',
      //   onclick: () => routing.pushTo(TRANSACTION),
      // }),
      // button({
      //   textContent: '달력',
      //   onclick: () => routing.pushTo(CALENDAR),
      // }),
      // button({
      //   textContent: '통계',
      //   onclick: () => routing.pushTo(STATISTICS),
      // })
    )
  }
}

export default SideBar
