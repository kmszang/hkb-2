import { SignIn } from '../pages/SignIn'
import { Transaction } from '../pages/Transaction'
import { Statistics } from '../pages/Statistics'
import { Calendar } from '../pages/Calendar'
import { Component } from './wooact'
import { combinedStore } from '../stores'
import { listenEvent, STORE_UPDATED } from './customEventHandler'

interface IRoutes {
  [route: string]: any
}

export class Routing {
  private app: Component<any, any>

  constructor(private routes: IRoutes) {
    this.popStateHandler = this.popStateHandler.bind(this)
    this.storeUpdatedHandler = this.storeUpdatedHandler.bind(this)

    listenEvent(STORE_UPDATED, this.storeUpdatedHandler)
    window.addEventListener('popstate', this.popStateHandler)
  }

  init(component: Component<any, any>) {
    this.app = component
  }

  getPath() {
    const path = location.pathname
    if (!this.routes[path]) {
      return '/'
    }

    return path
  }

  getPage(): Component<any, any> {
    return new this.routes[this.getPath()]()
  }

  pushTo(url: string) {
    const page = this.routes[url]

    if (!page) {
      location.href = '/'
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

    if (!state) {
      return
    }

    for (const [key, data] of Object.entries(state)) {
      combinedStore[key].injectData(this, data)
    }

    this.app.reRenderBy(this)
  }
}
