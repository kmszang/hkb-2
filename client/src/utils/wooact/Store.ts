import { Component } from '.'
import { Diffing } from './Diffing'

interface IActions {
  [actionName: string]: (args: any) => Promise<any> | any
}

export abstract class Store<T> {
  private subscribedComponent: Component<any, any>[] = []
  protected abstract actions: IActions
  protected abstract updateStore(action: string, args?: any)

  constructor(protected _data: T) {}

  async dispatch(action: string, args?: any) {
    const selectedAction = this.actions[action]

    if (!selectedAction) {
      console.error('None existed actions')
      return
    }

    const result = selectedAction(args)
    if (result instanceof Promise) {
      this.updateStore(action, await result)
    } else {
      this.updateStore(action, result)
    }

    this.rerender()
  }

  subscribe(component: Component<any, any>): Store<T> {
    this.subscribedComponent.push(component)
    return this
  }

  unSubscribe(component: Component<any, any>) {
    this.subscribedComponent = this.subscribedComponent.filter(
      (c) => c !== component
    )
  }

  get data(): T {
    return this._data
  }

  private rerender() {
    this.subscribedComponent.forEach((component) => component.reRenderBy(this))
  }
}
