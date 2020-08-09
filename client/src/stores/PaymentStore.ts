import { Store } from '../utils/Store'
import {
  IPaymentCreateBody,
  IPaymentResponse,
  fetchAllPayment,
  fetchUsersPayment,
  createNewPayment,
  deletePayment,
} from '../api/payment'

// actions
export const FETCH_ALL_PAYMENT = 'Payment/FETCH_ALL_PAYMENT' as const
export const FETCH_USERS_PAYMENT = 'Payment/FETCH_USERS_PAYMENT' as const
export const ADD_ONE_PAYMENT = 'Transaction/ADD_ONE' as const
export const DELETE_PAYMENT = 'Transaction/DELETE_PAYMENT' as const

export interface IPayment extends IPaymentResponse {
  selected: boolean
}

// connect store and actions
export class PaymentStore extends Store<IPayment[]> {
  actions = {
    [FETCH_ALL_PAYMENT]: this.fetchAllPayments,
    [FETCH_USERS_PAYMENT]: this.fetchUsersPayment,
    [ADD_ONE_PAYMENT]: this.addOnePayment,
    [DELETE_PAYMENT]: this.deletePayment,
  }

  constructor(initData?: IPayment[]) {
    super(initData || null)
  }

  async fetchAllPayments() {
    const [fetchedPayments, fetchError] = await fetchAllPayment()
    if (fetchError) {
      return console.error(fetchError)
    }

    return fetchedPayments.map((payment) => ({ ...payment, selected: false }))
  }

  async fetchUsersPayment() {
    const [usersPayment, fetchError] = await fetchUsersPayment()

    if (fetchError) {
      return console.error(fetchError)
    }

    return usersPayment.map(({ id }) => id)
  }

  async addOnePayment(inputs: IPaymentCreateBody) {
    const [createdPayment, createError] = await createNewPayment(inputs)
    if (createError) {
      return console.error(createError)
    }

    return createdPayment
  }

  async deletePayment(inputs: IPaymentCreateBody) {
    const [removedPaymentCount, removeError] = await deletePayment(inputs)
    if (removeError) {
      return console.error(removeError)
    }

    return inputs.paymentId
  }

  protected updateStore(action: string, result: any) {
    switch (action) {
      case FETCH_ALL_PAYMENT:
        this._data = result
        break
      case FETCH_USERS_PAYMENT:
        const usersPayment = new Set(result)
        this._data = this.data.map((payment) => ({
          ...payment,
          selected: usersPayment.has(payment.id),
        }))
        break
      case ADD_ONE_PAYMENT:
        this._data = this.data.map((payment) => ({
          ...payment,
          selected:
            payment.id === result ? !payment.selected : payment.selected,
        }))
        break
      case DELETE_PAYMENT:
        this._data = this.data.map((payment) => {
          if (payment.id === result) {
            return { ...payment, selected: false }
          }
          return payment
        })
        break
    }
  }
}
