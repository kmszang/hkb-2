import { Component } from '../../utils/wooact'
import { div, p, i } from '../../utils/wooact/defaultElements'
import { ITransactionResponse } from '../../api/transaction'
import { getCSVNumber } from '../../utils/getCSVNumber'
import { ICon } from '../ICon'
import { DELETE_TRANSACTION } from '../../stores/TransactionStore'

interface IProps {
  transaction: ITransactionResponse
}
interface IState {}

class TransactionItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, TransactionItem.prototype)
    this.connectAction('transaction')
    this.init()
  }

  renderHandler() {
    const { dispatch } = this.store.transaction
    const { id } = this.props.transaction

    return [
      new ICon({
        isSelected: false,
        onClickHandler: async () =>
          await this.store.transaction.dispatch(DELETE_TRANSACTION, id),
        iconName: 'trash',
        name: '삭제',
      }),
    ]
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
      new ICon({
        isSelected: true,
        isIncome,
        iconName,
        name: categoryName,
        onClickHandler: () => {},
      }),
      div(
        { className: 'info-container' },
        div({
          className: 'info-payment',
          textContent: paymentName,
        }),
        div({ className: 'info-content', textContent: content })
      ),
      div({
        className: `price ${isIncome ? 'income' : 'outcome'}`,
        textContent: getCSVNumber(price),
      }),
      div(
        {
          className: 'item-handler-container',
        },
        ...this.renderHandler()
      )
    )
  }
}

export default TransactionItem
