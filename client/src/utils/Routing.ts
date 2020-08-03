import { SignIn } from '../pages/SignIn'
import { Transaction } from '../pages/Transaction'
import { Statistics } from '../pages/Statistics'
import { Calendar } from '../pages/Calendar'
import { Component } from './wooact'
import { Diffing } from './wooact/Diffing'

interface IRoutes {
  [route: string]: Component<any, any>
}

export const SIGN_IN = '/sign-in' as const
export const DEFAULT = '/' as const
export const TRANSACTION = '/transaction' as const
export const STATISTICS = '/statistics' as const
export const CALENDAR = '/calendar' as const

const transactionPage = new Transaction()
const signInPage = new SignIn()
const statisticsPage = new Statistics()
const calendarPage = new Calendar()

class Routing {
  private routes = {
    [SIGN_IN]: signInPage,
    [TRANSACTION]: transactionPage,
    [DEFAULT]: transactionPage,
    [STATISTICS]: statisticsPage,
    [CALENDAR]: calendarPage,
  }

  private app: Component<any, any>

  constructor() {
    window.addEventListener('popstate', this.popStateHandler)
  }

  init(component: Component<any, any>) {
    this.app = component
  }

  getPath() {
    return location.pathname
  }

  getPage(): Component<any, any> {
    return this.routes[this.getPath()]
  }

  pushTo(url: string) {
    if (!this.routes[url]) {
      location.href = DEFAULT
      return
    }

    history.pushState({}, '', url)

    this.rerender()
  }

  popStateHandler(e: PopStateEvent) {
    this.rerender()
  }

  private rerender() {
    this.app.element = Diffing.reconciliation(
      this.app.element,
      this.app.render()
    )
  }
}

export const routing = new Routing()
