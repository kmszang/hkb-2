import { Component } from '../../utils/wooact'
import { div, form, input } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class User extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // const initialState: IState = {
  //
  // }
  // constructor(props: IProps) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, User.prototype)
    this.init()
  }

  render() {
    return form(
      { id: 'login-form' },
      input({ className: 'login-input', placeholder: 'login' }),
      input({ className: 'login-input', placeholder: '비밀번호 입력' })
    )
  }
}

export default User
