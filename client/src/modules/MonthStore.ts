import { Store } from '../utils/Store'
import { fireEvent, STORE_UPDATED } from '../utils/customEventHandler'

// type
export type Month = number

// actions
export const CHANGE_MONTH = 'Month/CHANGE_MONTH' as const

// connect store and actions
export class MonthStore extends Store<Month> {
  actions = {
    [CHANGE_MONTH]: this.changeMonth,
  }

  constructor(initialData: Month) {
    super(initialData)
    // TODO is this right?
    // window.dispatchEvent(
    //   new CustomEvent('storeupdated', { detail: { month: initialData } })
    // )
  }

  // actions
  changeMonth(updatedMonth: number) {
    return updatedMonth
  }

  protected updateStore(action: string, result: any) {
    switch (action) {
      case CHANGE_MONTH:
        this._data = result
        break
    }

    // window.dispatchEvent(
    //   new CustomEvent('storeupdated', { detail: { month: this.data } })
    // )
    fireEvent(STORE_UPDATED, { month: this.data })
  }
}
