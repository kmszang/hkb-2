import { SignIn } from '../pages/SignIn'
import { Transaction } from '../pages/Transaction'
import { Statistics } from '../pages/Statistics'
import { Calendar } from '../pages/Calendar'
import { Component } from './wooact'
import { combinedStore } from '../modules'
import { listenEvent, STORE_UPDATED } from './customEventHandler'

interface IRoutes {
  [route: string]: Component<any, any>
}

// declare global {
//   namespace Window {
//     interface PopStateEvent {
//       state: ICombinedStore
//     }
//   }
// }

export const SIGN_IN = '/sign-in' as const
export const BASIC = '/' as const
export const DEFAULT = '' as const
export const TRANSACTION = '/transaction' as const
export const STATISTICS = '/statistics' as const
export const CALENDAR = '/calendar' as const

const transactionPage = new Transaction()
const signInPage = new SignIn()
const statisticsPage = new Statistics()
const calendarPage = new Calendar()

export class Routing {
  private routes: IRoutes = {
    [BASIC]: transactionPage,
    [DEFAULT]: transactionPage,
    [SIGN_IN]: signInPage,
    [TRANSACTION]: transactionPage,
    [STATISTICS]: statisticsPage,
    [CALENDAR]: calendarPage,
  }

  private app: Component<any, any>

  constructor() {
    this.popStateHandler = this.popStateHandler.bind(this)
    this.storeUpdatedHandler = this.storeUpdatedHandler.bind(this)

    listenEvent(STORE_UPDATED, this.storeUpdatedHandler)
    // listenEvent(P, this.storeUpdatedHandler)
    window.addEventListener('popstate', this.popStateHandler)
    // window.addEventListener('storeupdated', this.storeUpdatedHandler)
  }

  init(component: Component<any, any>) {
    this.app = component
  }

  getPath() {
    const path = location.pathname
    if (!this.routes[path]) {
      return DEFAULT
    }

    return path
  }

  getPage(): Component<any, any> {
    return this.routes[this.getPath()]
  }

  pushTo(url: string) {
    const page = this.routes[url]

    if (!page) {
      location.href = DEFAULT
      this.app.reRenderBy(this)
      return
    }
    history.pushState({}, '', url)

    this.getPage().reRenderBy(this)
    this.app.reRenderBy(this)
  }

  storeUpdatedHandler(e: CustomEvent) {
    history.pushState(e.detail, '')
  }

  private popStateHandler(e: PopStateEvent) {
    const { state } = e

    console.log(state)
    if (!state) {
      return
    }

    for (const [key, data] of Object.entries(state)) {
      combinedStore[key].injectData(this, data)
    }

    this.app.reRenderBy(this)
  }
}

export const routing = new Routing()
