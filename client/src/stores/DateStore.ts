import { Store } from '../utils/Store'

export type DateInfo = {
  year: number
  month: number
}
// type
const LAST_MONTH = 12
const FIRST_MONTH = 1

// actions
export const SET_NEXT_MONTH = 'DateInfo/SET_NEXT_MONTH' as const
export const SET_PREV_MONTH = 'DateInfo/SET_PREV_MONTH' as const

// connect store and actions
export class DateStore extends Store<DateInfo> {
  actions = {
    [SET_NEXT_MONTH]: () => this.setNextMonth(),
    [SET_PREV_MONTH]: () => this.setPrevMonth(),
  }

  constructor(initialData: DateInfo) {
    super(initialData)
  }

  // actions
  setNextMonth() {
    const { year, month } = this.data

    if (month === LAST_MONTH) {
      return { year: year + 1, month: FIRST_MONTH }
    }
    return { month: month + 1 }
  }

  setPrevMonth() {
    const { year, month } = this.data

    if (month === FIRST_MONTH) {
      return { year: year - 1, month: LAST_MONTH }
    }
    return { month: month - 1 }
  }

  protected updateStore(action: string, result: any) {
    switch (action) {
      case SET_NEXT_MONTH:
        this._data = { ...this.data, ...result }
        break
      case SET_PREV_MONTH:
        this._data = { ...this.data, ...result }
        break
    }

    // window.dispatchEvent(
    //   new CustomEvent('storeupdated', { detail: { month: this.data } })
    // )
    // fireEvent(STORE_UPDATED, { date: this.data })
  }
}
