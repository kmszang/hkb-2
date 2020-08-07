import { Component } from '../../utils/wooact'
import { div, p, button } from '../../utils/wooact/defaultElements'
import {
  IPayment,
  DELETE_PAYMENT,
  ADD_ONE_PAYMENT,
} from '../../stores/PaymentStore'
import { ICon } from '../ICon'
interface IProps {
  payment: IPayment
  buttonContent: string
  mode: string
}
interface IState {}

class PaymentItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, PaymentItem.prototype)

    this.connectAction('payment')
    this.init()
  }

  async onClickAddHandler() {
    const { payment } = this.props

    await this.store.payment.dispatch(ADD_ONE_PAYMENT, {
      paymentId: payment.id,
      // userId: 78,
    })
  }

  async onClickDeleteHandler() {
    const { payment } = this.props

    this.store.payment.dispatch(DELETE_PAYMENT, {
      paymentId: payment.id,
      // userId: 78,
    })
  }

  render() {
    const { payment, buttonContent, mode } = this.props

    const onClickHandler = () =>
      mode === '추가' ? this.onClickAddHandler() : this.onClickDeleteHandler()

    return div(
      { className: 'paymentitem-container' },
      p({ textContent: payment.name }),
      new ICon({
        isSelected: false,
        onClickHandler: () => onClickHandler(),
        isIncome: mode === '추가',
        iconName: mode === '추가' ? 'plus' : 'minus',
      })
      // button({ textContent: buttonContent, onclick: onClickHandler })
    )
  }
}

export default PaymentItem
