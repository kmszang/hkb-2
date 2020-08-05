import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import { ICategoryResponse } from '../../api/category'
import { BoxInput } from '../BoxInput'
import { ADD_ONE_TRANSACTION } from '../../modules/TransactionStore'
import { ICon } from '../ICon'

interface IProps {
  isAddMode: boolean
}

interface IState {
  categories: ICategoryResponse[]
  isIncomeMode: number
  selectedCategoryId: number
}

interface IMode {
  iconName: string
  modeNumber: number
  name: string
}

class AddNewTransaction extends Component<IProps, IState> {
  constructor(props: IProps) {
    const state: IState = {
      categories: [],
      selectedCategoryId: -1,
      isIncomeMode: 1,
    }
    super(props, state)

    Object.setPrototypeOf(this, AddNewTransaction.prototype)
    this.connectStore('transaction', 'category')
    this.init()
  }

  renderInputs() {
    const contentInput = new BoxInput({
      iconName: 'doc_text',
      name: 'content',
      placeholder: '내용을 입력해주세요.',
      validateHandler: (target: HTMLInputElement) => target.value.length > 0,
      errMessage: '내용이 비어있습니다.',
    })

    const priceInput = new BoxInput({
      iconName: 'money_dollar',
      name: 'price',
      placeholder: '금액을 입력해주세요.',
      validateHandler: (target: HTMLInputElement) => target.value.length > 0,
      errMessage: '금액이 비어있습니다.',
    })

    return div(
      {
        className: 'inputs-container',
      },
      input({ className: 'date', type: 'date' }),
      contentInput,
      priceInput
    )
  }

  renderModes() {
    const isIncomeMode = this.getState('isIncomeMode') as number

    const modes: IMode[] = [
      {
        iconName: 'plus',
        modeNumber: 1,
        name: '수입',
      },
      { iconName: 'minus', modeNumber: 0, name: '수출' },
    ]

    return div(
      {
        className: 'mode-wrapper',
      },
      ...modes.map(({ name, iconName, modeNumber }) => {
        const onClickHandler = () => {
          this.setState('isIncomeMode', modeNumber)
          this.setState('selectedCategoryId', -1)
        }

        return new ICon({
          isSelected: isIncomeMode === modeNumber,
          onClickHandler: () => onClickHandler(),
          isIncome: isIncomeMode === 1,
          iconName,
          name,
        })
      })
    )
  }

  renderCategories() {
    const categories = this.store.category.data
    const isIncomeMode = this.getState('isIncomeMode') as number
    const selectedCategoryId = this.getState('selectedCategoryId') as number

    if (!categories || categories.length === 0) {
      return null
    }

    const filteredCategory = categories.filter(
      ({ isIncome }) => isIncomeMode === (isIncome ? 1 : 0)
    )

    return div(
      {
        className: 'category-wrapper',
      },
      ...filteredCategory.map(
        ({ id, isIncome, iconName, name }) =>
          new ICon({
            isSelected: selectedCategoryId === id,
            onClickHandler: () => this.setState('selectedCategoryId', id),
            isIncome,
            iconName,
            name,
          })
      )
    )
  }

  async onAddHandler() {
    const [dateEle, contentEle, priceEle] = Array.from(
      this.element.querySelectorAll('input')
    ) as HTMLInputElement[]

    const createTransactionBody = {
      content: contentEle.value,
      price: parseInt(priceEle.value),
      paymentId: 4,
      userId: 78,
      categoryId: this.getState('selectedCategoryId') as number,
    }

    this.store.transaction.dispatch(ADD_ONE_TRANSACTION, createTransactionBody)
  }

  render() {
    return div(
      {
        className: `add-new-transaction-container ${
          this.props.isAddMode ? 'visible' : ''
        }`,
      },
      div(
        {
          className: 'selector-wrapper',
        },
        this.renderModes(),
        this.renderCategories()
      ),
      this.renderInputs(),
      button({
        className: 'add-new-btn',
        textContent: 'add',
        onclick: async () => await this.onAddHandler(),
      })
    )
  }
}

export default AddNewTransaction
