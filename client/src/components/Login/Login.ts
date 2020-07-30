import { Component } from '../../utils/wooact'
import {
  div,
  section,
  h2,
  form,
  input,
  h1,
} from '../../utils/wooact/defaultElements'
import { logIn, signUp } from '../../api/user'
import { errorHandler } from '../../utils/errorHandler'
import { BoxInput } from '../BoxInput'
import { Button } from '../Button'
import {
  validateId,
  validatePassword,
  checkAndmakeInputData,
} from '../../utils/authorization'

interface IProps {}
interface IState {}

class Login extends Component<IProps, IState> {
  constructor() {
    super()
    Object.setPrototypeOf(this, Login.prototype)
    this.init()
  }

  loginHandler = (e: Event) => {
    e.preventDefault()

    const inputs = Array.from(
      this.element.querySelectorAll('input')
    ) as HTMLInputElement[]

    const loginBody = checkAndmakeInputData(inputs)

    if (!loginBody) {
      return
    }
    console.log(loginBody)
  }

  render() {
    return section(
      { id: 'login-box' },
      h1(
        { textContent: '로그인' },
        form(
          { id: 'login-form' },
          new BoxInput({
            placeholder: '아이디',
            name: 'username',
            type: 'text',
            validateHandler: validateId,
            iconName: '아이디',
            errMessage: '아이디를 입력해주세요',
          }),
          new BoxInput({
            placeholder: '비밀번호',
            name: 'password',
            type: 'password',
            validateHandler: validatePassword,
            iconName: '비밀번호',
            errMessage: '비밀번호를 입력해주세요',
          }),
          new Button({
            value: '로그인',
            onClickHandler: this.loginHandler,
          })
        )
      )
    )
  }
}

export default Login
