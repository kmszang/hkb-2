import { Component } from '../../utils/wooact'
import {
  div,
  section,
  h2,
  form,
  input,
  h1,
} from '../../utils/wooact/defaultElements'
import { logIn } from '../../api/user'
import { errorHandler } from '../../utils/errorHandler'
interface IProps {}
interface IState {}

class Login extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // constructor(props: IProps) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, Login.prototype)
    this.init()
  }

  validateId(userId) {
    if (typeof userId !== 'string') {
      return false
    }
    if (!userId) {
      return false
    }
    if (!userId.length) {
      return false
    }
    return true
  }

  validatePassword(password) {
    if (typeof password !== 'string') {
      return false
    }
    if (!password) {
      return false
    }
    if (!password.length) {
      return false
    }
    return true
  }
  async loginHandler(e: Event) {
    e.preventDefault()
    const $userId = this.element.querySelector('input') as HTMLInputElement
    const $password = this.element.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement

    const userId = $userId.value
    const password = $password.value

    if (!this.validateId(userId)) {
      return alert('아이디를 입력해주세요')
    }
    if (!this.validateId(password)) {
      return alert('비밀번호를 입력해주세요')
    }

    const [logInResponse, logInError] = await logIn({ userId, password })

    if (logInError) {
      return errorHandler(logInError)
    }
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
          input({
            type: 'submit',
            value: '로그인',
            className: 'login-btn',
            onclick: (e) => this.loginHandler(e),
          })
        )
      )
    )
  }
}

export default Login
