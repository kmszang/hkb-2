import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { ICon } from '../ICon'
import { Routing } from '../../utils/Routing'
import {
  SIGN_IN,
  TRANSACTION,
  CALENDAR,
  STATISTICS,
  PAYMENT,
} from '../../pages/Router'
import { MONTH_IN_ENG } from '../../utils/dateInfos'
import { FETCH_ALL_TRANSACTION } from '../../stores/TransactionStore'
import { SET_NEXT_MONTH, SET_PREV_MONTH } from '../../stores/DateStore'
import { getCurrentUser, logout } from '../../api/user'

interface IProps {
  routing: Routing
}
interface IState {
  isLoggedIn: boolean
}

class SideBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    const state: IState = {
      isLoggedIn: false,
    }
    super(props, state)

    Object.setPrototypeOf(this, SideBar.prototype)
    this.connectStore('date')
    this.connectAction('transaction')
    this.init()
  }

  async componentDidMount() {
    const [loggedInUser, error] = await getCurrentUser()
    if (error) {
      console.error(error)
    }

    if (loggedInUser && loggedInUser.id > 0) {
      this.setState('isLoggedIn', true)
    }
  }

  async fetchTransactions() {
    const { month, year } = this.store.date.data

    await this.store.transaction.dispatch(FETCH_ALL_TRANSACTION, {
      month,
      year,
    })
  }

  async updateDate(action: string) {
    this.store.date.dispatch(action)

    await this.fetchTransactions()
  }

  async setPrevMonth() {
    this.store.date.dispatch(SET_PREV_MONTH)

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
    const { month, year } = this.store.date.data
    return div(
      {
        className: 'date-container',
      },
      new ICon({
        onClickHandler: () => this.updateDate(SET_PREV_MONTH),
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
        onClickHandler: () => this.updateDate(SET_NEXT_MONTH),
        iconName: 'arrow_right',
      })
    )
  }

  renderRoutes() {
    const loggedInRoutes = [TRANSACTION, CALENDAR, STATISTICS, PAYMENT]
    const loggedInIcons = ['list_dash', 'calendar', 'chart_bar', 'creditcard']

    const routes = [SIGN_IN]
    const icons = ['lock']
    const { routing } = this.props

    if (this.getState('isLoggedIn')) {
      return [
        ...loggedInRoutes.map(
          (route, idx) =>
            new ICon({
              isSelected: routing.getPath() === route,
              onClickHandler: () => routing.pushTo(route),
              iconName: loggedInIcons[idx],
            })
        ),
        new ICon({
          isSelected: false,
          onClickHandler: async () => await logout(),
          iconName: 'person_crop_circle_fill_badge_xmark',
        }),
      ]
    }

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
