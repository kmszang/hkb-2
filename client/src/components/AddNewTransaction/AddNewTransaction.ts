import { Component } from '../../utils/wooact'
import { div, input, button } from '../../utils/wooact/defaultElements'
import { createNewTransaction } from '../../api/transaction'

interface IProps {}
interface IState {}

class AddNewTransaction extends Component<IProps, IState, undefined> {
  // constructor(props: IProps) {
  // super(props)
  // const initialState: IState = {
  //
  // }
  // constructor(props: IProps) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, AddNewTransaction.prototype)
    this.init()
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

    const input = this.element.querySelector(
      'input[name="content"]'
    ) as HTMLInputElement
    // console.log(input.value)
    // return
    const ids = {
      content: input.value,
      price: 5000,
      paymentId: 4,
      userId: 78,
      categoryId: Math.floor(Math.random() * 10),
    }
    // const input = { ...args, ...ids }
    const [res, err] = await createNewTransaction(ids)

    if (err) {
      console.error(err)
      return
    }
    await window.dispatchEvent(new Event('fetch_list'))
  }

  render() {
    return div(
      { className: 'add-new-transaction-container' },
      input({ name: 'content' }),
      // input({ name: 'price' }),
      button({
        className: 'add-new-btn',
        textContent: 'add',
        onclick: async () => await this.onAddHandler(),
      })
    )
  }
}

export default AddNewTransaction
