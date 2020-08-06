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
import { FETCH_ALL_TRANSACTION } from '../../modules/TransactionStore'

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
    this.connectAction('transaction')
    this.init()
  }

  async fetchTransactions() {
    const currentMonth = this.getState('month')
    const currentYear = this.getState('year')

    await this.store.transaction.dispatch(FETCH_ALL_TRANSACTION, {
      month: currentMonth,
      year: currentYear,
    })
  }

  async setNextMonth() {
    const currentMonth = this.getState('month')
    const currentYear = this.getState('year')

    if (currentMonth === 12) {
      this.setState('month', 1)
      this.setState('year', currentYear + 1)
    } else {
      this.setState('month', currentMonth + 1)
    }

    await this.fetchTransactions()
  }

  async setPrevMonth() {
    const currentMonth = this.getState('month')
    const currentYear = this.getState('year')

    if (currentMonth === 1) {
      this.setState('month', 12)
      this.setState('year', currentYear - 1)
    } else {
      this.setState('month', currentMonth - 1)
    }

    await this.fetchTransactions()
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
      new ICon({
        onClickHandler: () => this.setPrevMonth(),
        iconName: 'arrow_left',
      }),
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
      }),
      new ICon({
        onClickHandler: () => this.setNextMonth(),
        iconName: 'arrow_right',
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
