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
import { localUrl, deployUrl } from '../../../config/url'
import {
  validateId,
  validatePassword,
  checkAndmakeInputData,
} from '../../utils/authorization'
import { router } from '../App/App'
import { TRANSACTION, SIGN_IN } from '../../pages/Router'

// const baseUrl = localUrl
const baseUrl = process.env.NODE_ENV === 'production' ? deployUrl : localUrl

const githubLoginuUrl = `${baseUrl}/api/github-login`

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

    try {
      const result = await logIn(loginBody)
      if (!result || result.status !== 200) {
        return alert('로그인을 다시 해주세요')
      }
    } catch (e) {
      return alert('로그인을 다시 해주세요')
    }
    router.routing.pushTo(TRANSACTION)
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
            iconName: 'person_alt_circle',
            errMessage: '아이디를 입력해주세요',
          }),
          new BoxInput({
            placeholder: '비밀번호',
            name: 'password',
            type: 'password',
            validateHandler: validatePassword,
            iconName: 'lock',
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
