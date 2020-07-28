import { Component } from '../../utils/wooact'
import {
  div,
  section,
  h2,
  form,
  input,
  h1,
} from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class Login extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // const initialState: IState = {
  //
  // }
  // constructor(props: IProps) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, Login.prototype)
    this.init()
  }

  render() {
    return section(
      { id: 'login-box' },
      h1(
        { textContent: '로그인' },
        form(
          { id: 'login-form' },
          input({ className: 'login-input', placeholder: '아이디' }),
          input({
            type: 'password',
            className: 'login-input',
            placeholder: '비밀번호',
          }),
          input({ type: 'submit', value: '로그인' })
        )
      )
    )
  }
}

export default Login
