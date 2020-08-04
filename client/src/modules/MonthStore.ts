import { Store } from '../utils/wooact/Store'

// type
export interface IMonth {
  month: number
}

// actions
export const CHANGE_MONTH = 'Month/CHANGE_MONTH' as const

// connect store and actions
export class MonthStore extends Store<IMonth> {
  actions = {
    [CHANGE_MONTH]: this.changeMonth,
  }

  constructor() {
    super({ month: new Date().getMonth() })
  }

  // actions
  changeMonth(updatedMonth: number) {
    return updatedMonth
  }

  protected updateStore(action: string, result: any) {
    switch (action) {
      case CHANGE_MONTH:
        this._data = { ...this._data, ...result }
        break
    }
  }
}
