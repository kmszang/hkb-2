import { Component } from '../../utils/wooact'
import { div, button, i } from '../../utils/wooact/defaultElements'
import { ICon } from '../ICon'
import {
  SIGN_IN,
  CALENDAR,
  STATISTICS,
  routing,
  TRANSACTION,
} from '../../utils/Routing'
import { MONTH_IN_ENG } from '../../utils/dateInfos'

interface IProps {}
interface IState {
  month: number
  year: number
}

class SideBar extends Component<IProps, IState> {
  constructor() {
    const today = new Date()
    const state: IState = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    }

    super({}, state)

    Object.setPrototypeOf(this, SideBar.prototype)
    this.connectStore('transaction')
    this.init()
  }

  renderMainIcon() {
    return div(
      { className: 'main-icon' },
      new ICon({
        isSelected: true,
        onClickHandler: () => {},
        name: '가계부',
        iconName: 'minus_slash_plus',
      })
    )
  }

  renderDateInfo() {
    const month = this.getState('month')
    const year = this.getState('year')

    return div(
      {
        className: 'date-container',
      },
      div({
        className: 'year',
        textContent: year.toString(),
      }),
      div({
        className: 'month',
        textContent: month.toString(),
      }),
      div({
        className: 'month-eng',
        textContent: MONTH_IN_ENG[month - 1],
      })
    )
  }

  renderRoutes() {
    const routes = [SIGN_IN, TRANSACTION, CALENDAR, STATISTICS]
    const icons = ['lock', 'list_dash', 'calendar', 'chart_bar']

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
      this.renderMainIcon(),
      this.renderDateInfo(),
      div({ className: 'icon-wrapper' }, ...this.renderRoutes())
    )
  }
}

export default SideBar
