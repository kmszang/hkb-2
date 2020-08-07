import { Component } from '../../utils/wooact'
import { div, p } from '../../utils/wooact/defaultElements'
import { IPayment } from '../../stores/PaymentStore'
import { PaymentItem } from '../PaymentItem'
interface IProps {
  payments: IPayment[]
  className: string
  textContent: string
  buttonContent: string
  mode: string
}
interface IState {}

class PaymentBox extends Component<IProps, IState> {
  // usually get props through constructor
  // state iniitailized in constructor and pass down to state

  // constructor(props: IProps) {
  // const initialState: IState = {
  //
  // }
  // super(props, initialState)

  constructor(props: IProps) {
    // super get props and state, if not existed just send null or nothing.
    super(props)

    Object.setPrototypeOf(this, PaymentBox.prototype)

    // connectStore should be inintialized in here
    // before init method called
    // this.connectStore(name)
    this.init()
  }
  renderPayments() {
    const { payments, buttonContent, mode } = this.props
    return payments.map((payment) => {
      return new PaymentItem({ payment, buttonContent, mode })
    })
  }

  render() {
    const { className, textContent } = this.props
    return div({ className }, p({ textContent }), ...this.renderPayments())
  }
}

export default PaymentBox
