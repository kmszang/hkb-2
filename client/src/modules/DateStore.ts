import { Store } from '../utils/Store'
import { fireEvent, STORE_UPDATED } from '../utils/customEventHandler'

export type DateInfo = {
  year: number
  month: number
}
// type
export type Month = number

// actions
export const CHANGE_DATE_INFO = 'Month/CHANGE_DATE_INFO' as const

// connect store and actions
export class DateStore extends Store<DateInfo> {
  actions = {
    [CHANGE_DATE_INFO]: this.changeDateInfo,
  }

  constructor(initialData: DateInfo) {
    super(initialData)
    // TODO is this right?
    // window.dispatchEvent(
    //   new CustomEvent('storeupdated', { detail: { month: initialData } })
    // )
  }

  // actions
  changeDateInfo(dateInfo: Partial<DateInfo>) {
    return dateInfo
  }

  protected updateStore(action: string, result: any) {
    switch (action) {
      case CHANGE_DATE_INFO:
        this._data = { ...this.data, ...result }
        break
    }

    // window.dispatchEvent(
    //   new CustomEvent('storeupdated', { detail: { month: this.data } })
    // )
    fireEvent(STORE_UPDATED, { date: this.data })
  }
}
