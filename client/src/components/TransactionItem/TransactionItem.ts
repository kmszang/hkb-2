import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { ITransactionResponse } from '../../api/transaction'
import { getCSVNumber } from '../../utils/getCSVNumber'
import { ICon } from '../ICon'
import { DELETE_TRANSACTION } from '../../stores/TransactionStore'
import { AddNewTransaction } from '../AddNewTransaction'

interface IProps {
  transaction: ITransactionResponse
}
interface IState {
  isEditMode: boolean
}

class TransactionItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    const state: IState = {
      isEditMode: false,
    }
    super(props, state)

    Object.setPrototypeOf(this, TransactionItem.prototype)
    this.connectAction('transaction')
    this.init()
  }

  toggleMode() {
    this.setState('isEditMode', !this.getState('isEditMode'))
  }
  renderHandler() {
    const { id } = this.props.transaction

    return [
      new ICon({
        isSelected: false,
        onClickHandler: () => this.toggleMode(),
        iconName: 'wrench',
        name: '수정',
        isIncome: true,
      }),
      new ICon({
        isSelected: false,
        onClickHandler: async () =>
          await this.store.transaction.dispatch(DELETE_TRANSACTION, id),
        iconName: 'trash',
        name: '삭제',
        isIncome: false,
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

    const isEditMode = this.getState('isEditMode')
    const updateInputs = new AddNewTransaction({
      updateTranscation: this.props.transaction,
      onToggleHandler: () => this.toggleMode(),
    })

    return isEditMode
      ? updateInputs.element
      : div(
          {
            className: 'item-container',
            id: `item-${id}`,
            accessKey: 'transaction-item',
          },
          div(
            {
              className: 'overlap',
            },
            div(
              {
                className: 'item-handler-container',
              },
              ...this.renderHandler()
            )
          ),
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
          })
        )
  }
}

export default TransactionItem
