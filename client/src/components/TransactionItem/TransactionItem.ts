import { Component } from '../../utils/wooact'
import { div, p } from '../../utils/wooact/defaultElements'
import { ITransactionResponse } from '../../api/transaction'

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

  render() {
    const {
      id,
      content,
      price,
      categoryName,
      paymentName,
      createdAt,
    } = this.props.transaction

    return div(
      { className: 'item-container', id: `item-${id}` },
      p({ textContent: content }),
      p({ textContent: price.toString() }),
      p({ textContent: categoryName }),
      p({ textContent: paymentName }),
      p({ textContent: createdAt.toString() })
    )
  }
}

export default TransactionItem
