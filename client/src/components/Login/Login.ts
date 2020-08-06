import { Component } from '../../utils/wooact'
import {
  div,
  section,
  h2,
  form,
  input,
  h1,
} from '../../utils/wooact/defaultElements'
import { logIn, githubLogIn } from '../../api/user'
import { BoxInput } from '../BoxInput'
import { Button } from '../Button'
import {
  validateId,
  validatePassword,
  checkAndmakeInputData,
} from '../../utils/authorization'

const githubLoginuUrl = 'http://localhost:3000/api/github-login'

interface IProps {}
interface IState {}

class Login extends Component<IProps, IState> {
  constructor() {
    super()
    Object.setPrototypeOf(this, Login.prototype)
    this.init()
  }

  githubLoginHandler = async (e: Event) => {
    e.preventDefault()
    window.location.href = githubLoginuUrl
  }

  loginHandler = async (e) => {
    e.preventDefault()
    const $loginForm = e.target.closest('#login-form')
    const inputs = Array.from(
      $loginForm.querySelectorAll('input')
    ) as HTMLInputElement[]
    const loginBody = checkAndmakeInputData(inputs)

    if (!loginBody) {
      return
    }

    const [result, err] = await logIn(loginBody)
    console.log(result, err)
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
            name: 'userId',
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
          }),
          new Button({
            value: 'github 로그인',
            onClickHandler: this.githubLoginHandler,
          })
        )
      )
    )
  }
}

export default Login
