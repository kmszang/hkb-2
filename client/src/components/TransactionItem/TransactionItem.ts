import { Component } from '../../utils/wooact'
import { div, p, i } from '../../utils/wooact/defaultElements'
import { ITransactionResponse } from '../../api/transaction'
import { getCSVNumber } from '../../utils/getCSVNumber'

interface IProps {
  transaction: ITransactionResponse
}
interface IState {}

class TransactionItem extends Component<IProps, IState, undefined> {
  constructor(props: IProps) {
    super({ props })

    Object.setPrototypeOf(this, TransactionItem.prototype)
    this.init()
  }

  renderPrice() {
    const { price: priceNum, isIncome } = this.props.transaction

    return
  }

  render() {
    const {
      id,
      content,
      price,
      categoryName,
      paymentName,
      iconName,
      isIncome,
    } = this.props.transaction

    return div(
      {
        className: 'item-container',
        id: `item-${id}`,
        accessKey: 'transaction-item',
      },
      i({
        className: `f7-icons item-icon ${isIncome ? 'income' : 'outcome'}`,
        textContent: iconName,
      }),
      div(
        { className: 'info-container' },
        div({
          className: 'info-payment',
          textContent: paymentName + '/' + categoryName,
        }),
        div({ className: 'info-content', textContent: content })
      ),
      div({
        className: `price ${isIncome ? 'income' : 'outcome'}`,
        textContent: getCSVNumber(price),
      })
    )
  }
}

export default TransactionItem
