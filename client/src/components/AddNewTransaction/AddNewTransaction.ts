import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import { ICreateTransaction } from '../../api/category'
import { BoxInput } from '../BoxInput'
import { ADD_ONE_TRANSACTION } from '../../stores/TransactionStore'
import { ICon } from '../ICon'
import { getDate, getFullDateIn } from '../../utils/dateInfos'

interface IProps {}

interface IState {
  isIncomeMode: number
  selectedCategoryId: number
  isAddMode: boolean
  date: string
}

interface IMode {
  iconName: string
  modeNumber: number
  name: string
}

class AddNewTransaction extends Component<IProps, IState> {
  constructor() {
    const state: IState = {
      selectedCategoryId: -1,
      isIncomeMode: 0,
      isAddMode: false,
      date: '',
    }
    super({}, state)

    Object.setPrototypeOf(this, AddNewTransaction.prototype)
    this.connectStore('date', 'transaction', 'category')
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
      type: 'number',
      placeholder: '금액을 입력해주세요.',
      validateHandler: (target: HTMLInputElement) => target.value.length > 0,
      errMessage: '올바른 금액을 입력해주세요.',
    })

    return div(
      {
        className: 'inputs-container',
      },
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
    const [contentEle, priceEle] = Array.from(
      this.element.querySelectorAll('input')
    ) as HTMLInputElement[]

    const createTransactionBody: ICreateTransaction = {
      content: contentEle.value,
      price: parseInt(priceEle.value),
      paymentId: 4,
      userId: 78,
      categoryId: this.getState('selectedCategoryId') as number,
      date: this.getState('date') as string,
    }

    for (const key in createTransactionBody) {
      const value = createTransactionBody[key]
      if (typeof value === 'number' && value < 0) {
        return
      }

      if (typeof value === 'string' && value.length === 0) {
        return
      }
    }

    await this.store.transaction.dispatch(
      ADD_ONE_TRANSACTION,
      createTransactionBody
    )

    contentEle.value = ''
    priceEle.value = ''
    this.toggleVisibilty()
  }

  getFullDate() {
    const NUMBER_OF_GRID = 42
    const { year, month } = this.store.date.data
    const currentMonth = getFullDateIn(year, month)
    const previousMonth = getFullDateIn(year, month - 1)
    const nextMonth = getFullDateIn(year, month + 1)
    const firstDay = currentMonth[0]

    const prevLength = previousMonth.length - firstDay.day
    const nextLength = NUMBER_OF_GRID - (firstDay.day + currentMonth.length)

    return [
      ...previousMonth.slice(prevLength),
      ...currentMonth,
      ...nextMonth.slice(0, nextLength),
    ]
  }

  renderMiniCalendar() {
    const dateSet = this.getFullDate()
    const { year, month } = this.store.date.data

    return div(
      { className: 'calendar-input-container' },
      div({ className: 'year-month', textContent: `${year}년 ${month}월` }),
      div(
        { className: 'date-table' },
        ...dateSet.map(({ dayName, year, month, date }) => {
          const currentDate = `${year}-${month}-${date}`
          const isSelected = this.getState('date') === currentDate
          return div(
            {
              className: `calendar-item-container ${
                isSelected ? 'choosen' : ''
              }`,
            },
            div({
              className: `${dayName}`,
              textContent: `${date}`,
              onclick: () => this.setState('date', currentDate),
            })
          )
        })
      )
    )
  }

  toggleVisibilty() {
    const isAddMode = this.getState('isAddMode')
    this.setState('isIncomeMode', 0)
    this.setState('selectedCategoryId', -1)
    this.setState('date', '')
    this.setState('isAddMode', !isAddMode)
  }

  render() {
    const isAddMode = this.getState('isAddMode')

    return div(
      {},
      button({
        className: `toogle-add-input ${isAddMode ? 'close' : ''}`,
        textContent: '+',
        onclick: () => this.toggleVisibilty(),
      }),
      div(
        {
          className: `add-new-transaction-container ${
            isAddMode ? 'visible' : ''
          }`,
        },
        this.renderMiniCalendar(),
        div(
          { className: 'other-infos' },
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
            textContent: '새로운 거래내역 등록하기',
            onclick: async () => await this.onAddHandler(),
          })
        )
      )
    )
  }
}

export default AddNewTransaction
