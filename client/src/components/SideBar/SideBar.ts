import { Component } from '../../utils/wooact'
import { div, button, i } from '../../utils/wooact/defaultElements'
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
          isSelected: routing.getPath() === route,
          onClickHandler: () => routing.pushTo(route),
          name: '',
          iconName: icons[idx],
        })
    )
  }

  render() {
    return div(
      { className: 'sidebar-container' },
      div(
        { className: 'main-icon' },
        new ICon({
          isSelected: true,
          onClickHandler: () => {},
          name: '가계부',
          iconName: 'minus_slash_plus',
        })
      ),
      div({ className: 'icon-wrapper' }, ...this.renderRoutes())
      // new ICon({
      //   isSelected: false,
      //   onClickHandler: () => routing.pushTo(SIGN_IN),
      //   name: '',
      //   iconName: 'person_al1t_circle',
      // })
    )
  }
}

export default SideBar
