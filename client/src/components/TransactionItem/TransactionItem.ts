import { Component } from '../../utils/wooact'
import { div, p, i } from '../../utils/wooact/defaultElements'
import { ITransactionResponse } from '../../api/transaction'
import { getCSVNumber } from '../../utils/getCSVNumber'

interface IProps {
  transaction: ITransactionResponse
}
interface IState {}

class TransactionItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, TransactionItem.prototype)
    this.init()
  }

  renderPrice() {
    const { price: priceNum, isIncome } = this.props.transaction

    return div({
      className: `price ${isIncome ? 'income' : 'outcome'}`,
      textContent: getCSVNumber(priceNum),
    })
  }

  render() {
    const {
      id,
      content,
      price,
      categoryName,
      paymentName,
      createdAt,
      isIncome,
    } = this.props.transaction

    return div(
      { className: 'item-container', id: `item-${id}` },
      i({
        className: 'f7-icons item-icon',
        textContent: 'ant',
        // style: { backgroundColor: '#4FED93' },
      }),
      div(
        { className: 'info-container' },
        div({
          className: 'info-payment',
          textContent: paymentName + '/' + categoryName,
        }),
        div({ className: 'info-content', textContent: content })
      ),
      this.renderPrice()
      // div({ textContent: createdAt.toString().split('T')[0] })
    )
  }
}

export default TransactionItem
