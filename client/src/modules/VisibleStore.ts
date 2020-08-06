import { Store } from '../utils/Store'

export interface IVisible {
  income: boolean
  outcome: boolean
}

// actions
export const TOGGLE_INCOME = 'Visible/TOGGLE_INCOME' as const
export const TOGGLE_OUTCOME = 'Visible/TOGGLE_OUTCOME' as const

// connect store and actions
export class VisibleStore extends Store<IVisible> {
  actions = {
    [TOGGLE_INCOME]: this.toggleIncome,
    [TOGGLE_OUTCOME]: this.toggleOutcome,
  }

  constructor(initData?: IVisible) {
    super(initData || null)
  }

  toggleIncome() {}

  toggleOutcome() {}

  protected updateStore(action: string, result: any) {
    switch (action) {
      case TOGGLE_INCOME:
        this._data = { ...this.data, income: !this.data.income }
        break
      case TOGGLE_OUTCOME:
        this._data = { ...this.data, outcome: !this.data.outcome }
    }
  }
}
