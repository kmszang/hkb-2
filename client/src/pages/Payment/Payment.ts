import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { PaymentBox } from '../../components/PaymentBox'
interface IProps {}
interface IState {}

class Payment extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Payment.prototype)
    this.connectStore('payment')
    this.init()
  }
  filterPayment() {
    if (!this.store.payment.data) {
      return [[], []]
    }
    const selectedPayments = this.store.payment.data.filter(
      ({ selected }) => selected
    )
    const unSelectedPayments = this.store.payment.data.filter(
      ({ selected }) => !selected
    )

    return [selectedPayments, unSelectedPayments]
  }

  render() {
    const [selectedPayments, unSelectedPayments] = this.filterPayment()
    console.log('rerender', [selectedPayments, unSelectedPayments])
    return div(
      { className: 'payment-container' },
      new PaymentBox({
        payments: selectedPayments,
        className: 'selected-payments',
        textContent: '추가한 카드',
        buttonContent: '삭제',
        mode: '삭제',
      }),
      new PaymentBox({
        payments: unSelectedPayments,
        className: 'unselected-payments',
        textContent: '추가할 수 있는 카드',
        buttonContent: '추가',
        mode: '추가',
      })
    )
  }
}

export default Payment
