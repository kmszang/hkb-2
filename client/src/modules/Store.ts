import { Component } from '../utils/wooact'
import { Diffing } from '../utils/wooact/Diffing'

interface IActions {
  [actionName: string]: (args: any) => Promise<any> | any
}

export abstract class Store<T> {
  private subscribedComponent: Component<any, any>[] = []
  protected abstract actions: IActions

  constructor(protected data: T) {}

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

  subscribe(component: Component<any, any>) {
    this.subscribedComponent.push(component)
  }

  unSubscribe(component: Component<any, any>) {
    this.subscribedComponent = this.subscribedComponent.filter(
      (c) => c !== component
    )
  }

  protected abstract updateStore(action: string, args?: any)

  public getActionNames() {
    return new Set(Object.keys(this.actions))
  }

  public getData(): T {
    return this.data
  }

  private rerender() {
    this.subscribedComponent.forEach(
      (component) =>
        (component.element = Diffing.reconciliation(
          component.element,
          component.render()
        ))
    )
  }
}
