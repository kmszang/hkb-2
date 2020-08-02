import { Component } from '../../utils/wooact'
import { div, input, button, i } from '../../utils/wooact/defaultElements'
import { createNewTransaction } from '../../api/transaction'
import { fetchAllCategories, ICategoryResponse } from '../../api/category'
import { BoxInput } from '../BoxInput'

interface IProps {}

interface IState {
  categories: ICategoryResponse[]
  isIncomeMode: number
  selectedCategoryId: number
}

class AddNewTransaction extends Component<IProps, IState, undefined> {
  constructor() {
    const state: IState = {
      categories: [],
      selectedCategoryId: -1,
      isIncomeMode: 0,
    }
    super({ state })

    Object.setPrototypeOf(this, AddNewTransaction.prototype)
    this.init()
  }

  async componentDidMount() {
    const [allCategories, error] = await fetchAllCategories()

    if (error) {
      console.error(error)
    }
    this.setState('categories', allCategories)
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
      contentInput,
      priceInput
    )
  }

  renderCategories() {
    const categories = this.getState('categories') as ICategoryResponse[]
    const isIncomeMode = this.getState('isIncomeMode') as number
    const selectedCategoryId = this.getState('selectedCategoryId') as number

    if (!categories || categories.length === 0) {
      return [null]
    }

    const filteredCategory = categories.filter(
      ({ isIncome }) => isIncomeMode === (isIncome ? 1 : 0)
    )

    return filteredCategory.map(({ id, isIncome, iconName, name }) =>
      div(
        {
          className: `category-container ${
            selectedCategoryId === id ? 'selected' : ''
          }`,
          onclick: () => this.setState('selectedCategoryId', id),
        },
        i({
          className: `f7-icons ${isIncome ? 'income' : 'outcome'}`,
          textContent: iconName,
        }),
        div({ className: 'category-description', textContent: name })
      )
    )
  }

  async onAddHandler() {
    // const inputs =
    // const inputs = Array.from(
    //   this.element.querySelectorAll('input')
    // ) as HTMLInputElement[]
    // const args = inputs.reduce<{content: string}>(
    //   (acc, input) => (acc[input.name] = input.value),
    //   {}
    // )

    const content = this.element.querySelector(
      'input[name="content"]'
    ) as HTMLInputElement
    const price = this.element.querySelector(
      'input[name="price"]'
    ) as HTMLInputElement
    // console.log(input.value)
    // return
    const ids = {
      content: content.value,
      price: parseInt(price.value),
      paymentId: 4,
      userId: 78,
      categoryId: this.getState('selectedCategoryId') as number,
    }
    console.log(ids)
    // const input = { ...args, ...ids }
    const [res, err] = await createNewTransaction(ids)

    if (err) {
      console.error(err)
      return
    }
    await window.dispatchEvent(new Event('fetch_list'))
  }

  render() {
    const selectedCategoryId = this.getState('selectedCategoryId') as number

    return div(
      { className: 'add-new-transaction-container' },
      this.renderInputs(),
      div(
        {
          className: 'categroy-wrapper',
        },
        ...this.renderCategories()
      ),
      button({
        className: 'add-new-btn',
        textContent: 'add',
        onclick: async () => await this.onAddHandler(),
      })
    )
  }
}

export default AddNewTransaction
