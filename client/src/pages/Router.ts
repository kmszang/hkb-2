import { Component } from '../utils/wooact'
import { Transaction } from './Transaction'
import { SignIn } from './SignIn'
import { Statistics } from './Statistics'
import { Calendar } from './Calendar'
import { Routing } from '../utils/Routing'
import { div } from '../utils/wooact/defaultElements'
import { Header } from '../components/Header'
import { Payment } from './Payment'

export const SIGN_IN = '/sign-in' as const
export const TRANSACTION = '/' as const
export const STATISTICS = '/statistics' as const
export const CALENDAR = '/calendar' as const
export const PAYMENT = '/payment' as const

interface IProps {}
interface IState {}

export class RouterComponent extends Component<IProps, IState> {
  public routing

  constructor() {
    super()

    Object.setPrototypeOf(this, RouterComponent.prototype)
    this.routing = new Routing({
      [TRANSACTION]: Transaction,
      [SIGN_IN]: SignIn,
      [STATISTICS]: Statistics,
      [CALENDAR]: Calendar,
      [PAYMENT]: Payment,
    })
    this.routing.init(this)
    this.init()
  }

  getHeaderTitle(rawTitle: string) {
    const title = rawTitle.slice(1)
    if (!title) {
      return 'Transaction'
    }
    return title.toUpperCase()[0] + title.slice(1)
  }

  render() {
    return div(
      { className: 'main-container' },
      new Header({ title: this.getHeaderTitle(this.routing.getPath()) }),
      this.routing.getPage()
    )
  }
}
